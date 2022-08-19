import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActionButton } from 'src/app/models/actionButton';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/services/categorias.service';
import { BaseComponent } from '../../abstract/base.component';
import { GenerateCategoriaComponent } from '../generate-categoria/generate-categoria.component';

@Component({
  selector: 'app-abm-categorias',
  templateUrl: './abm-categorias.component.html',
  styleUrls: ['./abm-categorias.component.scss']
})
export class AbmCategoriasComponent extends BaseComponent implements OnInit, OnDestroy {

  categorias: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>();
  columnasTabla: string[] = ['id','categoria', 'actions'];
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
  ];

  categoriasSubscription!: Subscription;
  
  constructor(
    private categoriasService: CategoriasService,
    public override dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.loadTable();
  }

  ngOnDestroy(): void {
    this.categoriasSubscription && this.categoriasSubscription.unsubscribe();
  }

  loadTable(): void {
    this.categoriasSubscription = this.categoriasService.getAllCategorias().subscribe(
      response => this.categorias.data = response
    )
  }

  createCategoria(): void {
    this.dialog.open(GenerateCategoriaComponent, {width: '20%'}).afterClosed().subscribe(
      (categoria) => {
        if (categoria) {
          const nuevaCategoria: any = {
            categoria: categoria.categoria,
          }
          this.categoriasSubscription = this.categoriasService.createCategoria(nuevaCategoria).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Categoría creada correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    );
  }

  editCategoria(categoria: Categoria): void {
    this.dialog.open(GenerateCategoriaComponent, {width: '20%', data: categoria}).afterClosed().subscribe(
      (categoria) => {
        if (categoria) {
          this.categoriasSubscription = this.categoriasService.updateCategoria(categoria).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Categoría modificada correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    );
  }

  deleteCategoria(categoria: Categoria): void {
    this.showBasicDialog('Atención', 'Va a borrar una categoría, confirme eliminación').afterClosed().subscribe(
      resp => {
        if (resp) {
          this.categoriasSubscription = this.categoriasService.deleteCategoria(categoria).subscribe(
            response => {
              if(response){
                this.snackBar.open('Categoría eliminada correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    )
  }

}
