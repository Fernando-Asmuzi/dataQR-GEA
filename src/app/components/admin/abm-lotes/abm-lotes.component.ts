import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { emptyLote, Lote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';
import { GenerateLoteComponent } from '../generate-lote/generate-lote.component';

@Component({
  selector: 'app-abm-lotes',
  templateUrl: './abm-lotes.component.html',
  styleUrls: ['./abm-lotes.component.scss']
})
export class AbmLotesComponent implements OnInit {

  public lotes: Array<Lote> = new Array<Lote>();

  constructor(
    private lotesServices: LotesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadLotes();   
  }


  generateLote(): void {
    this.dialog.open(GenerateLoteComponent, {width: '20%'}).afterClosed().subscribe(
      () => this.loadLotes()
    )
  }

  loadLotes(): void {
    this.lotesServices.getLoteForCodes().subscribe(
      response => this.lotes = response
    )
  }
}
