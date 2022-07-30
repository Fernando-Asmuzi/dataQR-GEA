import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Lote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';

@Component({
  selector: 'app-detalle-lote',
  templateUrl: './detalle-lote.component.html',
  styleUrls: ['./detalle-lote.component.scss']
})
export class DetalleLoteComponent implements OnInit {

  columnasTabla: string[] = ['id','producto','categoria','estado'];
  dataSource: MatTableDataSource<Lote> = new MatTableDataSource<Lote>();

  constructor(
    private lotesService: LotesService
  ) { }

  ngOnInit(): void {
    this.lotesService.getLoteByCod(2).subscribe(
      response => {
        console.log(response);
        this.dataSource.data = response;
      }
    )
  }

}
