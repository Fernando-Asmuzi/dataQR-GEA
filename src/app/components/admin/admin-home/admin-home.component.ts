import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { emptyLote, Lote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { MatDialog } from '@angular/material/dialog';
import { CardLoteComponent } from '../card-lote/card-lote.component';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnDestroy {

  lote: Lote = emptyLote();
  lotesSubscription!: Subscription;
  view: [number, number] = [1200, 1000];
  colorScheme: Color = {
    name: 'picnic',
    selectable: false,
    group: ScaleType.Ordinal,
    domain: [
      '#FAC51D',
      '#66BD6D',
      '#FAA026',
      '#29BB9C',
      '#E96B56',
      '#55ACD2',
      '#B7332F',
      '#2C83C9',
      '#9166B8',
      '#92E7E8'
    ]
  };
  single: any[] = [];
  torta: any[] = [];
  
  constructor(
    private lotesService: LotesService,
    private dialog: MatDialog,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioService.checkAdmin();
    this.lotesSubscription = this.lotesService.getLoteForCodes().subscribe(
      response => {
        this.setData(response);
      }
    )
  }

  ngOnDestroy(): void {
    this.lotesSubscription && this.lotesSubscription.unsubscribe();
  }

  verDetalle(data: any): void {
    this.dialog.open(CardLoteComponent, {data: data, width: '40%'})
  }

  formatPercent(value: any): any {
    return value;
  }

  setLote(value: any): void {
    this.torta = [];
    this.lote = value.value.extra;
    const registrados = {
      name: 'Registrados',
      value: this.lote.registrados
    }
    const libres = {
      name: 'Libres',
      value: this.lote.libres
    }
    this.torta = [...this.torta, registrados, libres];
  }

  setData(response: any): void {
    let arr = response.sort((a: Lote, b: Lote) => b.cantidad - a.cantidad)
    arr.forEach( (lote: Lote) => {
      let newLote = {
        name: 'Lote N°: ' + lote.codigo,
        value: Number(lote.cantidad),
        extra: lote
      };
      this.single = [...this.single, newLote];
    });
  }

}


