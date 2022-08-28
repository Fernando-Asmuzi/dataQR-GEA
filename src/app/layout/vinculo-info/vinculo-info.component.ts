import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { emptyFamiliar, Familiar } from 'src/app/models/familiar';
import { emptyLote, Lote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';
import { VinculacionService } from 'src/app/services/vinculacion.service';


@Component({
  selector: 'app-vinculo-info',
  templateUrl: './vinculo-info.component.html',
  styleUrls: ['./vinculo-info.component.scss']
})
export class VinculoInfoComponent implements OnInit {

  lote: Lote = emptyLote();
  categoria: string = '';
  producto: string = '';
  familiar: Familiar = emptyFamiliar();

  constructor(
    private dialogRef: MatDialogRef<VinculoInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lotesService: LotesService,
    private vinculacionService: VinculacionService) { }

  ngOnInit(): void {
    
    this.lote = {...this.lote,
        id: this.data.id_lote,
    }
    this.lotesService.getLoteById(this.lote).subscribe(response => {
      console.log(this.data.id_lote)
      this.lote = response;
      this.categoria = this.lote.categoria.categoria;
      this.producto = this.lote.producto.producto;
      this.vinculacionService.getFamiliarByLoteId(this.data.id_lote).subscribe( response =>{
            this.familiar = response;
      });
    })

    
  }

}
