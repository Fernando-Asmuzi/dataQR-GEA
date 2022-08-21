import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lote, emptyLote } from 'src/app/models/lote';
import { LotesService } from 'src/app/services/lotes.service';
import { VinculacionService } from 'src/app/services/vinculacion.service';
import { Familiar, emptyFamiliar } from 'src/app/models/familiar';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  codigo: number = 0 ;
  lote: Lote = emptyLote();
  familiar: Familiar = emptyFamiliar();
  informacion = [
    //datos personales
    {name: "Usuario", value: '', icon:"person"},
    {name: "Dirección" , value: '', icon: "house"},
    {name: "Teléfono de contacto" , value: '', icon: "phone_in_talk"},
    //datos de salud
    {name: "Diagnóstico" , value: '', icon: "medical_information"},
    {name: "Alergias" , value: '', icon: "vaccines"},
    {name: "Medicación" , value: '', icon: "medication"},
    {name: "Factor sanguíneo" , value: '', icon: "bloodtype"},
    {name: "Más información" , value: '', icon: "info"},
  ]

  constructor(
    private route: ActivatedRoute, 
    private lotesService: LotesService, 
    private vinculacionService: VinculacionService) { }

  ngOnInit(): void {
    this.codigo = Number(this.route.snapshot.paramMap.get('codigo'));
    this.lote.id = this.codigo;

    this.lotesService.getLoteById(this.lote).subscribe(response => {
      this.lote = response;
    })

    this.vinculacionService.getFamiliarByLoteId(this.codigo).subscribe( response =>{
        this.informacion[0].value = response.nombre + " " + response.apellido
        this.informacion[1].value = response.direccion_primaria
        this.informacion[2].value = response.telefono_primario
        this.informacion[3].value = response.diagnostico
        this.informacion[4].value = response.alergias
        this.informacion[5].value = response.medicacion
        this.informacion[6].value = response.factor_sangre
        this.informacion[7].value = response.otros
    });

  }

  registrar(){
      var producto = {
         id: this.codigo,
         opcion: "registro"
      }
     localStorage.setItem("registro", JSON.stringify(producto)); 
  }  
}
