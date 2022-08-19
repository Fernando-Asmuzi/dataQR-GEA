import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActionButton } from 'src/app/models/actionButton';
import { Diseno } from 'src/app/models/diseno';
import { DisenoService } from 'src/app/services/diseno.service';
import { BaseComponent } from '../../abstract/base.component';
import { GenerateDisenoComponent } from '../generate-diseno/generate-diseno.component';

@Component({
  selector: 'app-abm-diseno',
  templateUrl: './abm-diseno.component.html',
  styleUrls: ['./abm-diseno.component.scss']
})
export class AbmDisenoComponent extends BaseComponent implements OnInit, OnDestroy {

  disenos: MatTableDataSource<Diseno> = new MatTableDataSource<Diseno>();
  columnasTabla: string[] = ['id','nombre','descripcion', 'actions'];
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

  disenoSubscription!: Subscription;
  
  constructor(
    private disenoService: DisenoService,
    public override dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.loadTable();
  }

  ngOnDestroy(): void {
    this.disenoSubscription && this.disenoSubscription.unsubscribe();
  }

  editDiseno(diseno: Diseno): void {
    this.dialog.open(GenerateDisenoComponent, {width: '20%', data: diseno}).afterClosed().subscribe(
      (diseno) => {
        if (diseno) {
          this.disenoSubscription = this.disenoService.putDiseno(diseno).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Diseño modificado correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    );
  }

  deleteDiseno(diseno: Diseno): void {
    this.showBasicDialog('Atención', 'Va a borrar un diseño, confirme eliminación').afterClosed().subscribe(
      resp => {
        if (resp) {
          this.disenoSubscription = this.disenoService.deleteDiseno(diseno).subscribe(
            response => {
              if(response){
                this.snackBar.open('Diseño eliminado correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    )
  }

  loadTable(): void {
    this.disenoSubscription = this.disenoService.getAllDisenos().subscribe(
      response => this.disenos.data = response
    )
  }

  createDiseno(): void {
    this.dialog.open(GenerateDisenoComponent, {width: '20%'}).afterClosed().subscribe(
      (diseno) => {
        if (diseno) {
          const nuevoDiseno: any = {
            nombre: diseno.nombre,
            descripcion: diseno.descripcion
          }
          this.disenoSubscription = this.disenoService.postDiseno(nuevoDiseno).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Diseño creado correctamente', 'Aceptar', {duration: 1500})
                this.loadTable();
              }
            }
          )
        }
      }
    );
  }

}
