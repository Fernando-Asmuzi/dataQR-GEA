import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { emptyLote, Lote } from 'src/app/models/lote';

@Component({
  selector: 'app-card-lote',
  templateUrl: './card-lote.component.html',
  styleUrls: ['./card-lote.component.scss']
})
export class CardLoteComponent implements OnInit {

  lote: Lote = emptyLote();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.lote = this.data.extra
  }

}
