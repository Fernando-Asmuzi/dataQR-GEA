import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, Subscription } from 'rxjs';
import { emptyLote, Lote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';
import { BaseComponent } from '../../abstract/base.component';
import { DeleteLoteComponent } from '../delete-lote/delete-lote.component';
import { GenerateLoteComponent } from '../generate-lote/generate-lote.component';

@Component({
  selector: 'app-abm-lotes',
  templateUrl: './abm-lotes.component.html',
  styleUrls: ['./abm-lotes.component.scss']
})
export class AbmLotesComponent extends BaseComponent implements OnInit, OnDestroy {

  public lotes: Array<Lote> = new Array<Lote>();

  lotesSubscription!: Subscription;
  oneLoteSubscription!: Subscription;

  showSpinner: boolean = false;

  constructor(
    private lotesServices: LotesService,
    public override dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.loadLotes();   
  }

  ngOnDestroy(): void {
    this.lotesSubscription && this.lotesSubscription.unsubscribe();
    this.oneLoteSubscription && this.oneLoteSubscription.unsubscribe();
  }

  generateLote(): void {
    this.dialog.open(GenerateLoteComponent, {width: '20%'}).afterClosed().subscribe(
      () => this.loadLotes()
    )
  }

  loadLotes(): void {
    this.showSpinner = true;
    this.lotesSubscription = this.lotesServices.getLoteForCodes().pipe(
      finalize( () => this.showSpinner = false)
    ).subscribe(
      response => this.lotes = response
    )
  }

  eliminarLote(lote: Lote): void {
    this.oneLoteSubscription = this.lotesServices.getLoteByCod(Number(lote.codigo)).subscribe(
      response => {
        const loteEncontrado = response.find( (lote: any) => lote.estado === true );
        loteEncontrado ? this.deleteConfirm(lote, ' que contiene QRs en uso') : this.deleteConfirm(lote, '');
      }
    );
  }

  deleteConfirm(lote: Lote, message: string): void {
    const dialogMessage = 'Esta por eliminar un lote' + message + ', no se podrán recuperar los datos luego de la eliminación. Confirme';
    this.dialog.open(DeleteLoteComponent, {data: dialogMessage})
    .afterClosed().subscribe(
      response => {
        if (response) {
          const deletedLote = {...lote, motivo: response.motivo};
          this.lotesSubscription = this.lotesServices.delete(deletedLote).subscribe(
            response => {
              if (response) {
                this.snackBar.open('El lote se eliminó correctamente', 'Aceptar', {duration: 1500});
                this.loadLotes();
              }
            }
          );
        }
      }
    );
  }
}
