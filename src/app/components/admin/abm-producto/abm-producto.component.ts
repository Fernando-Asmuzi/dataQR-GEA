import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionButton } from 'src/app/models/actionButton';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { BaseComponent } from '../../abstract/base.component';
import { GenerateProductoComponent } from '../generate-producto/generate-producto.component';

@Component({
  selector: 'app-abm-producto',
  templateUrl: './abm-producto.component.html',
  styleUrls: ['./abm-producto.component.scss']
})
export class AbmProductoComponent extends BaseComponent implements OnInit {

  productos: MatTableDataSource<Producto> = new MatTableDataSource<Producto>()
  columnasTabla: string[] = ['id','producto','imagen', 'actions'];
  actionButtons: ActionButton[] = [
    {
      icon: 'edit',
      color: 'primary',
      tooltip: 'Editar'
    },
    {
      icon: 'delete',
      color: 'warn',
      tooltip: 'Eliminar'
    },
  ]

  constructor(
    private productosService: ProductosService,
    public override dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.productosService.getAllProductos().subscribe(
      response => this.productos.data = response
    )
  }

  editProducto(producto: Producto): void {
    this.dialog.open(GenerateProductoComponent, {width: '20%', data: producto}).afterClosed().subscribe(
      (producto) => {
        if (producto) {
          this.productosService.updateProducto(producto).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Producto modificado correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    );
  }

  deleteProducto(producto: Producto): void {
    this.showBasicDialog('Atención', 'Va a borrar un producto, confirme eliminación').afterClosed().subscribe(
      response => {
        if (response) {
          this.productosService.deleteProducto(producto).subscribe(
            () => {
              this.snackBar.open('Producto eliminado', 'Aceptar', {duration: 1500});
              this.loadTable();
            }
          )
        }
      }
    )
  }

  createProducto(): void {
    this.dialog.open(GenerateProductoComponent, {width: '20%'}).afterClosed().subscribe(
      (producto) => {
        if (producto) {
          const nuevoProducto: any = {
            producto: producto.producto,
            imagen: producto.imagen
          }
          this.productosService.createProducto(nuevoProducto).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Producto creado correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    );
  }

}
