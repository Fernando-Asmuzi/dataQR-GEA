import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Provincia {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-familiar-form',
  templateUrl: './familiar-form.component.html',
  styleUrls: ['./familiar-form.component.scss']
})
export class FamiliarFormComponent implements OnInit {

  listaProvincias: any = [];
  selectedValue: string = '';
  
  constructor(private paisesService: PaisesService, private http: HttpClient) { }

  ngOnInit(): void {

    this.getProvincias();
    
  }

  getProvincias(){
    this.http.get('https://apis.datos.gob.ar/georef/api/provincias').subscribe((provincias: any)=>{
        this.listaProvincias = provincias.provincias
    })
  }

}
