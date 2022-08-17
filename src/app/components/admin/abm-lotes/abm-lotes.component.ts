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
    // this.lotesServices.getAllLotes().subscribe(
    //   response => {
    //     this.lotes = response;
    //     console.log(this.lotes);
    //     this.lotes.map(lote => {
    //       if(lote.id >= 1 && lote.id <=10){
    //         lote.producto.id = 2
    //       }
    //       if(lote.id >= 11 && lote.id <= 20){
    //         lote.producto.id = 3
    //         lote.categoria.id = 2
    //       }
    //       if(lote.id >= 21 && lote.id <= 30){
    //         lote.producto.id = 4
    //       }
    //       this.lotesServices.updateLotes(lote).subscribe(
    //         response => console.log(response)
    //       )
    //     })
    //   }
    // )
    this.loadLotes();
    
    
  }


  generateLote(): void {
    this.dialog.open(GenerateLoteComponent, {width: '50%'}).afterClosed().subscribe(
      () => this.loadLotes()
    )
  }

  loadLotes(): void {
    this.lotesServices.getLoteForCodes().subscribe(
      response => this.lotes = response
    )
  }
}
