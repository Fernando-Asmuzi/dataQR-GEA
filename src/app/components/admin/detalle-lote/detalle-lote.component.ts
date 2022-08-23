import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActionButton } from 'src/app/models/actionButton';
import { emptyLote, Lote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';
import { VinculacionService } from 'src/app/services/vinculacion.service';
import { BaseComponent } from '../../abstract/base.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewQRComponent } from '../view-qr/view-qr.component';

@Component({
  selector: 'app-detalle-lote',
  templateUrl: './detalle-lote.component.html',
  styleUrls: ['./detalle-lote.component.scss']
})
export class DetalleLoteComponent extends BaseComponent implements OnInit, OnDestroy {

  columnasTabla: string[] = ['id','producto','categoria','estado','bloqueado', 'actions'];
  dataSource: MatTableDataSource<Lote> = new MatTableDataSource<Lote>();
  lote: Lote = emptyLote();

  loteSubscription!: Subscription;
  vinculacionSubscription!: Subscription;

  actionButtons: ActionButton[] = [
    {
      color: 'white',
      icon: 'remove_red_eye',
      tooltip: 'Ver QR'
    },
    {
      color: 'primary',
      icon: 'restore',
      tooltip: 'Desvincular familiar'
    },
    {
      color: 'warn',
      icon: 'lock',
      tooltip: 'Editar bloqueo'
    },
  ];

  constructor(
    private lotesService: LotesService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public override dialog: MatDialog,
    private vinculacionService: VinculacionService
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.loadLote();
  }

  ngOnDestroy(): void {
    this.loteSubscription && this.loteSubscription.unsubscribe();
  }

  manageLock(lote: Lote): void {
    const bloquear = lote.bloqueado ? 'desbloquear' : 'bloquear';
    this.showBasicDialog('Atención',`Esta por ${bloquear} el lote ${lote.id}. Confirme`).afterClosed().subscribe(
      response => {
        if (response) {
          lote.bloqueado = lote.bloqueado ? false : true;
          this.loteSubscription = this.lotesService.updateLotes(lote).subscribe(
            response => {
              if (response) {
                this.snackBar.open('Lote modificado', 'Aceptar', {duration: 1500});
              }
            }
          );
        }
      }
    );
  }

  viewQR(lote: Lote): void {
    this.dialog.open(ViewQRComponent, {width: '30%', data: lote})
  }

  desvincular(lote: Lote): void {
    this.showBasicDialog('Atención', 'Está por limpiar la información asociada al código QR. Confirme').afterClosed().subscribe(
      response => {
        if (response) {
          this.vinculacionSubscription = this.vinculacionService.deleteVinculacionByLoteId(lote).subscribe(
            response => {
              if (response) {
                this.snackBar.open('Se limpio la información asociada al código QR', 'Aceptar', {duration: 1500});
                this.loadLote();
              }
            }
          )
        }
      }
    )
  }

  blockLote(): void {
    this.showBasicDialog('Atención', 'Está por bloquear todo el lote. Confirme').afterClosed().subscribe(
      response => {
        if (response) {
          const updateLote = {
            codigo: this.lote.codigo,
            bloquear: true,
            isBlock: true
          }
          this.lotesService.updateLoteByCod(updateLote).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Lote bloqueado correctamente', 'Aceptar', {duration: 1500});
                this.loadLote();
              }
            }
          );
        }
      }
    );
  }

  unlockLote(): void {
    this.showBasicDialog('Atención', 'Está por desbloquear todo el lote. Confirme').afterClosed().subscribe(
      response => {
        if (response) {
          const updateLote = {
            codigo: this.lote.codigo,
            bloquear: true,
            isBlock: false
          }
          this.lotesService.updateLoteByCod(updateLote).subscribe(
            resp => {
              if (resp) {
                this.snackBar.open('Lote desbloqueado correctamente', 'Aceptar', {duration: 1500});
                this.loadLote();
              }
            }
          );
        }
      }
    );
  }

  loadLote(): void {
    this.activatedRoute.params.subscribe(
      (resp: any) => {
        this.loteSubscription = this.lotesService.getLoteByCod(resp.codigo).subscribe(
          response => {
            this.dataSource.data = response;
            this.lote = response[0];
          }
        )
      }
    )
  }
}
