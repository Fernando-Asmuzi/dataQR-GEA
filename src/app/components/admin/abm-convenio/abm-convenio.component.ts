import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActionButton } from 'src/app/models/actionButton';
import { Convenio } from 'src/app/models/convenio';
import { ConveniosService } from 'src/app/services/convenios.service';
import { BaseComponent } from '../../abstract/base.component';
import { GenerateConvenioComponent } from '../generate-convenio/generate-convenio.component';

@Component({
  selector: 'app-abm-convenio',
  templateUrl: './abm-convenio.component.html',
  styleUrls: ['./abm-convenio.component.scss']
})
export class AbmConvenioComponent extends BaseComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Convenio> = new MatTableDataSource<Convenio>();
  columnasTabla: string[] = ['id','nombre','telefono', 'email', 'cuit', 'actions'];
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

  convenioSubscription!: Subscription;

  constructor(
    private conveniosService: ConveniosService,
    private snackBar: MatSnackBar,
    public override dialog: MatDialog
  ) {
    super(dialog)
  }

  ngOnInit(): void {
    this.loadTable();
  }

  ngOnDestroy(): void {
    this.convenioSubscription && this.convenioSubscription.unsubscribe();
  }

  loadTable(): void {
    this.convenioSubscription = this.conveniosService.getAllConvenios().subscribe(
      response => this.dataSource.data = response
    )
  }

  createConvenio(): void {
    this.dialog.open(GenerateConvenioComponent, {width: '20%'}).afterClosed().subscribe(
      (convenio: Convenio) => {
        this.convenioSubscription = this.conveniosService.postConvenio(convenio).subscribe(
          resp => {
            if (resp) {
              this.snackBar.open('Convenio creado correctamente', 'Aceptar', {duration: 1500});
              this.loadTable();
            }
          }
        )
      }
    )
  }

  editConvenio(convenio: Convenio): void {
    this.dialog.open(GenerateConvenioComponent, {width: '20%', data: convenio}).afterClosed().subscribe(
      (convenio: Convenio) => {
        if (convenio) {
          this.convenioSubscription = this.conveniosService.putConvenio(convenio).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Convenio editado correctamente', 'Aceptar', {duration: 1500});
                this.loadTable();
              }
            }
          )
        }
      }
    )
  }

  deleteConvenio(convenio: Convenio): void {
    this.showBasicDialog('Atención', 'Va a borrar un producto, confirme eliminación').afterClosed().subscribe(
      response => {
        if(response){
          this.convenioSubscription = this.conveniosService.deleteConvenio(convenio).subscribe(
            response => {
              if(response){
                this.snackBar.open('Convenio eliminado correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    )
  }
}
