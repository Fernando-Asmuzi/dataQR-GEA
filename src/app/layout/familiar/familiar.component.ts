import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { Familiar } from 'src/app/models/familiar';
import { MatDialog } from '@angular/material/dialog';
import { FamiliarFormComponent } from '../familiar-form/familiar-form.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../components/abstract/base.component';

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.scss']
})
export class FamiliarComponent extends BaseComponent implements OnInit {

  id: String | null = '';
  familiares: Array<Familiar> = [];
  

  constructor(
    public override dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private familiaresService: FamiliaresService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
    ) { super(dialog); }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : this.usuarioService.getUserLogin()?.id;
    this.getFamiliares();
       
  }

  getFamiliares(){
    this.familiaresService.getFamiliares(Number(this.id)).subscribe(response =>{
      this.familiares = response  
   })  
  }

  openDialog(){
    this.dialog.open(FamiliarFormComponent, {
      width: '600px'
    }).afterClosed().subscribe(resp => {
      if(resp){
         this.getFamiliares()
         this.snackBar.open('Familiar agregado con éxito', 'Aceptar', {duration: 1500})
      }
    })
  }

  editFamiliar(familiar: Familiar){
     this.dialog.open(FamiliarFormComponent,{
       data: familiar
     }).afterClosed().subscribe(resp => {
      if(resp){
         this.getFamiliares() 
         this.snackBar.open('Familiar modificado con éxito', 'Aceptar', {duration: 1500})
      }
    })
  }


  deleteFamiliar(familiar: any){
    this.showBasicDialog('Atención', 'Va a borrar un diseño, confirme eliminación').afterClosed().subscribe(
      resp => {
        if (resp) {
          this.familiaresService.deleteFamiliar(familiar).subscribe(
            response => {
              if(response){
                this.snackBar.open('familiar eliminado correctamente', 'Aceptar', {duration: 1500})
                this.getFamiliares();
              }
            }
          )
        }
      }
    )
  }
 
}
