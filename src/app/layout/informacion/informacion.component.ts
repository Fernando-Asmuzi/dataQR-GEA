import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lote, emptyLote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';
import { VinculacionService } from 'src/app/services/vinculacion.service';
import { Familiar, emptyFamiliar } from 'src/app/models/familiar';
import { finalize, Subscription } from 'rxjs';
import { ScanService } from 'src/app/services/scan.service';
import { emptyScan, Scan } from 'src/app/models/scan';
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit, OnDestroy {

  codigo!: number;
  lote: Lote = emptyLote();
  familiar: Familiar = emptyFamiliar();
  categoria: string = '';
  libre: boolean = true;

  informacion = [
    //datos personales
    {name: "Nombre", value: '', icon:"person"},
    {name: "Dirección" , value: '', icon: "house"},
    {name: "Teléfono de contacto" , value: '', icon: "phone_in_talk"},
  ]
  localizacion = [
    {name: "Ciudad" , value: '', icon: "location_city"},
    {name: "Provincia" , value: '', icon: "share_location"},
    {name: "Pais" , value: '', icon: "flag"},
  ]
  salud = [
    {name: "Diagnóstico" , value: '', icon: "medical_information"},
    {name: "Alergias" , value: '', icon: "vaccines"},
    {name: "Medicación" , value: '', icon: "medication"},
    {name: "Factor sanguíneo" , value: '', icon: "bloodtype"},
    {name: "Más información" , value: '', icon: "info"},
  ]
  showSpinner = true;

  scanSubscription!: Subscription;

  id_usuario!: number;

  constructor(
    private route: ActivatedRoute, 
    private lotesService: LotesService, 
    private vinculacionService: VinculacionService,
    private scanService: ScanService
  ) { }

  ngOnInit(): void {
    this.codigo = Number(this.route.snapshot.paramMap.get('codigo'));
    this.lote.id = this.codigo;

    this.lotesService.getLoteById(this.lote).pipe(
      finalize( () => this.showSpinner = false),
    ).subscribe(response => {
      this.lote = response;
      this.categoria = this.lote.categoria.categoria;
      if(!this.lote.libre && !this.lote.eliminado && !this.lote.bloqueado){
        this.libre = false;
        this.saveScan();
      }
    })

    this.vinculacionService.getFamiliarByLoteId(this.codigo).subscribe( response =>{
      this.informacion[0].value = response.nombre + " " + response.apellido
      this.informacion[1].value = response.direccion_primaria
      this.informacion[2].value = response.telefono_primario

      this.localizacion[0].value = response.ciudad
      this.localizacion[1].value = response.provincia
      this.localizacion[2].value = response.pais

      this.salud[0].value = response.diagnostico
      this.salud[1].value = response.alergias
      this.salud[2].value = response.medicacion
      this.salud[3].value = response.factor_sangre
      this.salud[4].value = response.otros
      this.id_usuario = response.id_usuario
    });

  }

  ngOnDestroy():  void {
    this.scanSubscription && this.scanSubscription.unsubscribe();
  }

  registrar(){
    var producto = {
      id: this.codigo,
      opcion: "registro"
    }
    localStorage.setItem("registro", JSON.stringify(producto)); 
  }

  llamar(): void {
    window.location.href = `tel:${this.informacion[2].value}`;
  }

  saveScan(): void {
    let scan: Scan = emptyScan();
    scan = {
      ...scan,
      lote: this.lote,
      movimiento: 'Escaneo de QR',
      id_usuario: this.id_usuario
    };
    this.scanSubscription = this.scanService.saveScan(scan).subscribe();
  }
}
