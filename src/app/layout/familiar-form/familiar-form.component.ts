import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-familiar-form',
  templateUrl: './familiar-form.component.html',
  styleUrls: ['./familiar-form.component.scss']
})
export class FamiliarFormComponent implements OnInit {

  listaProvincias: any = [];
  listaDepartamentos: any = [];
  selectedValue: string = '';
  factorSangre = [
    {value: '0+'},
    {value: '0-'},
    {value: 'A+'},
    {value: 'A-'},
    {value: 'B+'},
    {value: 'B-'},
    {value: 'AB+'},
    {value: 'AB-'},
  ]
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.getProvincias();
    
  }

  getProvincias(){
    this.http.get('https://apis.datos.gob.ar/georef/api/provincias').subscribe((provincias: any)=>{
        this.listaProvincias = provincias.provincias
    })
  }

  getLocalidades(provincia: String){
    this.http.get('https://apis.datos.gob.ar/georef/api/departamentos?provincia='+provincia).subscribe((departamentos: any)=>{
        this.listaDepartamentos = departamentos.departamentos
        console.log(departamentos)
  })

  }

}
