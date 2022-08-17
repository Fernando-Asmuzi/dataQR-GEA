import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActionButton } from 'src/app/models/actionButton';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { BaseComponent } from '../../abstract/base.component';

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
    public override dialog: MatDialog
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.getAllProductos();
  }

  getAllProductos(): void {
    this.productosService.getAllProductos().subscribe(
      response => this.productos.data = response
    )
  }

  editProducto(): void {

  }

  deleteProducto(): void {
    this.showBasicDialog('Atención', 'Va a borrar un producto, confirme eliminación').afterClosed().subscribe(
      response => console.log(response)
    )
  }

}
