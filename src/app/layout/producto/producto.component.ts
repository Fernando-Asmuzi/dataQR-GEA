import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vinculo } from '../../models/vinculo'
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VinculacionService } from 'src/app/services/vinculacion.service';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { Familiar } from 'src/app/models/familiar';
import { emptyLote, Lote } from 'src/app/models/lote';
import {MatAccordion} from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenerateVinculacionComponent } from '../generate-vinculacion/generate-vinculacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/components/abstract/base.component';
import { VinculoInfoComponent } from '../vinculo-info/vinculo-info.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent extends BaseComponent implements OnInit, OnDestroy {


  id: String | null = '';
  familiares: Array<Familiar> = [];
  registro: any;
  showSpinner: boolean = true;

  displayedColumns: string[] = ['Descripcion', 'Nombre', 'Informacion'];
  dataSource: MatTableDataSource<Vinculo> = new MatTableDataSource<Vinculo>();
  lote: any;
  @ViewChild(MatTable) table!: MatTable<any>;
  vinculosSubscription!: Subscription;
  familiaresSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private vinculacionService: VinculacionService,
    private familiaresService: FamiliaresService,
    public override dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { super(dialog); }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : this.usuarioService.getUserLogin()?.id;
    this.getVinculos();

    this.familiaresSubscription = this.familiaresService.getFamiliares(Number(this.id)).subscribe(response =>{
      if (response.code != 204) {
        this.familiares = response  
      }
    })

    this.registro = localStorage.getItem("registro") ? JSON.parse(localStorage.getItem("registro") || '') : null;
    console.log(this.registro)
    if(this.registro != null){
      this.dialog.open(GenerateVinculacionComponent, {
        width: '600px',
        data: this.registro,
        disableClose: true
      }).afterClosed().subscribe(resp => {
        if(resp){
          this.snackBar.open('Vinculación realizada con éxito', 'Aceptar', {duration: 1500})
          this.getVinculos();
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.vinculosSubscription && this.vinculosSubscription.unsubscribe();
    this.familiaresSubscription && this.familiaresSubscription.unsubscribe();
  }

  getVinculos(){
    this.vinculosSubscription = this.vinculacionService.getVinculoFamiliar(Number(this.id)).pipe(
      finalize(
        () => this.showSpinner = false
      ),
    ).subscribe(response =>{
      this.dataSource.data = (response.code != 204) ? response : [];
    })
  }

  deleteVinculo(id_lote: any){
    console.log(id_lote)
    let lote: Lote = emptyLote();
    lote = {...lote, id: id_lote}

    this.showBasicDialog('Atención', 'Va a borrar un vínculo de producto, confirme eliminación').afterClosed().subscribe(
      resp => {
        if (resp) {
          this.vinculosSubscription = this.vinculacionService.deleteVinculacionByLoteId(lote).subscribe(resp => {
              if(resp){
                this.getVinculos();
                this.snackBar.open('Vínculo eliminado correctamente', 'Aceptar', {duration: 1500})
              }
            }
          )
        }
      }
    )
  }

  showVinculoInformacion(vinculo: Vinculo){
    this.dialog.open(VinculoInfoComponent,{
      data: vinculo
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
