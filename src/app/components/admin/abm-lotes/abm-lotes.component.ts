import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { emptyLote, Lote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';
import { GenerateLoteComponent } from '../generate-lote/generate-lote.component';

@Component({
  selector: 'app-abm-lotes',
  templateUrl: './abm-lotes.component.html',
  styleUrls: ['./abm-lotes.component.scss']
})
export class AbmLotesComponent implements OnInit, OnDestroy {

  public lotes: Array<Lote> = new Array<Lote>();

  lotesSubscription!: Subscription;

  constructor(
    private lotesServices: LotesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadLotes();   
  }

  ngOnDestroy(): void {
    this.lotesSubscription && this.lotesSubscription.unsubscribe();
  }

  generateLote(): void {
    this.dialog.open(GenerateLoteComponent, {width: '20%'}).afterClosed().subscribe(
      () => this.loadLotes()
    )
  }

  loadLotes(): void {
    this.lotesSubscription = this.lotesServices.getLoteForCodes().subscribe(
      response => this.lotes = response
    )
  }
}
