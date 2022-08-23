import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActionButton } from 'src/app/models/actionButton';
import { emptyLote, Lote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';

@Component({
  selector: 'app-detalle-lote',
  templateUrl: './detalle-lote.component.html',
  styleUrls: ['./detalle-lote.component.scss']
})
export class DetalleLoteComponent implements OnInit, OnDestroy {

  columnasTabla: string[] = ['id','producto','categoria','estado','bloqueado', 'actions'];
  dataSource: MatTableDataSource<Lote> = new MatTableDataSource<Lote>();
  lote: Lote = emptyLote();

  loteSubscription!: Subscription;

  actionButtons: ActionButton[] = [
    {
      color: 'primary',
      icon: 'block',
      tooltip: 'Bloquear QR'
    }
  ];

  constructor(
    private lotesService: LotesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.loteSubscription && this.loteSubscription.unsubscribe();
  }

}
