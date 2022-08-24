import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vinculo } from '../../models/vinculo'
import {MatTableDataSource} from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VinculacionService } from 'src/app/services/vinculacion.service';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { Familiar } from 'src/app/models/familiar';
import {MatAccordion} from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenerateVinculacionComponent } from '../generate-vinculacion/generate-vinculacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const ELEMENT_DATA: Vinculo[] = []; 

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {


  @ViewChild(MatAccordion) accordion!: MatAccordion;
  id: String | null = '';
  vinculos: Array<Vinculo> = [];
  ELEMENT_DATA = this.vinculos;
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
    private familiaresService: FamiliaresService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    
    this.registro = localStorage.getItem("registro") ? JSON.parse(localStorage.getItem("registro") || '') : null;
    if(this.registro != null){
      this.dialog.open(GenerateVinculacionComponent, {
        width: '600px',
        data: this.registro
      }).afterClosed().subscribe(resp => {
        if(resp){
          this.getVinculos();
          this.snackBar.open('Vinculación realizada con éxito', 'Aceptar', {duration: 1500})
        }
      })
    }

    this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : this.usuarioService.getUserLogin()?.id;
    this.getVinculos();
    this.familiaresService.getFamiliares(Number(this.id)).subscribe(response =>{
      this.familiares = response  
   })
  }

  getVinculos(){
    this.vinculacionService.getVinculoFamiliar(Number(this.id)).subscribe(response =>{
      this.dataSource = response 
      console.log(this.dataSource)
    })
  }

  openDialog(){
    this.dialog.open(GenerateVinculacionComponent, {
      width: '600px',
    }).afterClosed().subscribe(resp => {
      if(resp){
        this.getVinculos();
         this.snackBar.open('Vinculación realizada con éxito', 'Aceptar', {duration: 1500})
      }
    })
  }
}
