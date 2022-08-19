import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionButton } from 'src/app/models/actionButton';
import { Marco } from 'src/app/models/marco';
import { MarcosService } from 'src/app/services/marcos.service';
import { BaseComponent } from '../../abstract/base.component';
import { GenerateMarcoComponent } from '../generate-marco/generate-marco.component';

@Component({
  selector: 'app-abm-marcos',
  templateUrl: './abm-marcos.component.html',
  styleUrls: ['./abm-marcos.component.scss']
})
export class AbmMarcosComponent extends BaseComponent implements OnInit {

  dataSource: MatTableDataSource<Marco> = new MatTableDataSource<Marco>();
  columnasTabla: string[] = ['id','imagen','descripcion', 'actions'];
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
    private marcosService: MarcosService,
    private snackBar: MatSnackBar,
    public override dialog: MatDialog
  ) {
    super(dialog);
  }

  ngOnInit(): void {
   this.loadTable();
  }

  loadTable(): void {
    this.marcosService.getAllMarcos().subscribe(
      response => this.dataSource.data = response
    )
  }

  editMarco(marco: Marco): void {
    this.dialog.open(GenerateMarcoComponent, {width: '20%', data: marco}).afterClosed().subscribe(
      (marco) => {
        if (marco) {
          this.marcosService.updateMarco(marco).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Marco modificado correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    );
  }

  deleteMarco(marco: Marco): void {
    this.showBasicDialog('Atención', 'Va a borrar un producto, confirme eliminación').afterClosed().subscribe(
      response => {
        if(response){
          this.marcosService.deleteMarco(marco).subscribe(
            response => {
              if(response){
                this.snackBar.open('Marco eliminado correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    )
  }

  createMarco(): void {
    this.dialog.open(GenerateMarcoComponent, {width: '20%'}).afterClosed().subscribe(
      (marco) => {
        if (marco) {
          const nuevoMarco: any = {
            imagen: marco.imagen,
            descripcion: marco.descripcion
          }
          this.marcosService.createMarco(nuevoMarco).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Marco creado correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    );
  }

}
