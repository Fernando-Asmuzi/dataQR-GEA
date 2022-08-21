import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vinculo } from '../../models/vinculo'
import {MatTableDataSource} from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VinculacionService } from 'src/app/services/vinculacion.service';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { Familiar } from 'src/app/models/familiar';

const ELEMENT_DATA: Vinculo[] = []; 

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  id: String | null = '';
  vinculos: Array<Vinculo> = [];
  ELEMENT_DATA = this.vinculos;
  vinculacion: boolean = false;
  existente: boolean = false;
  familiares: Array<Familiar> = [];
  selectedValue: string = '';
  registro: any;

  displayedColumns: string[] = ['Descripcion', 'Nombre', 'Apellido', 'Informacion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private vinculacionService: VinculacionService,
    private familiaresService: FamiliaresService
    ) { }

  ngOnInit(): void {
    this.vinculacion == false;
    this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : this.usuarioService.getUserLogin()?.id;
    this.registro = JSON.parse(localStorage.getItem("registro") || '')

    if(this.registro.opcion == "registro"){
        this.vinculacion = true;
        this.existente = true;
        this.familiaresService.getFamiliares(Number(this.id)).subscribe(response =>{
          this.familiares = response  
       })
    }

   this.vinculacionService.getVinculoFamiliar(Number(this.id)).subscribe(response =>{
      this.dataSource = response 
      console.log(this.dataSource)
    })
  }

  cambiar(){
    if(this.vinculacion == false){
      this.vinculacion = !this.vinculacion;
    } 
  }
}
