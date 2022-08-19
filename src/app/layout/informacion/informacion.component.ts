import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lote, emptyLote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  codigo: String | null = '';
  lote: Lote = emptyLote();

  constructor(private route: ActivatedRoute, private lotesService: LotesService) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    
    this.lote.id = Number(this.codigo);
    console.log(this.lote)

    this.lotesService.getLoteById(this.lote).subscribe(response => {
        this.lote = response;
        console.log(this.lote)
    })    
  }
}
