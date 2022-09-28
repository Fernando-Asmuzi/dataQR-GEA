import { Component, Inject, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { emptyFamiliar, Familiar } from 'src/app/models/familiar';
import { TerminosCondicionesComponent } from '../terminos-condiciones/terminos-condiciones.component';
import { BaseComponent } from 'src/app/components/abstract/base.component';



@Component({
  selector: 'app-familiar-form',
  templateUrl: './familiar-form.component.html',
  styleUrls: ['./familiar-form.component.scss']
})
export class FamiliarFormComponent extends BaseComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    id_usuario: [''],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    direccion_primaria: ['', [Validators.required]],
    direccion_secundaria: ['', [Validators.required]],
    telefono_primario: ['', [Validators.required, Validators.maxLength(10)]],
    telefono_secundario: ['', [Validators.required, Validators.maxLength(10)]],
    documento_tipo: ['', [Validators.required]],
    documento: ['', [Validators.required]],
    diagnostico: ['', [Validators.required]],
    medicacion: ['', [Validators.required]],
    alergias: ['', [Validators.required]],
    factor_sangre: ['', [Validators.required]],
    otros: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    pais: [{value: "Argentina", disabled: true}, [Validators.required]],
    ciudad: ['', [Validators.required]],
    codigo_postal: ['', [Validators.required]],
    checked: ['', [Validators.requiredTrue]]
  })


  usuario: any;
  listaProvincias: any = [];
  listaDepartamentos: any = [];
  provinciaValue: string = '';
  localidadValue: string = '';
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

  tipo_documento = [
    {value: 'DNI'},
    {value: 'Libreta de enrolamiento'},
    {value: 'Libreta cívica'},
    {value: 'Pasaporte'}
  ]
  
  constructor(private http: HttpClient, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FamiliarFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private familiaresService: FamiliaresService,
    private usuarioService: UsuarioService,
    public override dialog: MatDialog,

    ) { super(dialog); }

  ngOnInit(): void {
    
    this.usuario = this.usuarioService.getUserLogin();
    this.getProvincias();

    if (this.data) {
      this.form.patchValue({

        id: this.data.id,
        id_usuario: this.data.id_usuario,
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        direccion_primaria: this.data.direccion_primaria,
        direccion_secundaria: this.data.direccion_secundaria,
        telefono_primario: this.data.telefono_primario,
        telefono_secundario: this.data.telefono_secundario,
        documento: this.data.documento,
        diagnostico: this.data.diagnostico,
        medicacion: this.data.medicacion,
        alergias: this.data.alergias,
        factor_sangre: this.data.factor_sangre,
        otros: this.data.otros,
        provincia: this.data.provincia,
        pais: this.data.pais,
        ciudad: this.data.ciudad

      });
      let localidad = {
        value: this.data.provincia
      }
      this.getLocalidades(localidad);
    }
  }

  submitForm(): void {
    
    let user = this.form.value

    user = {...user,
      id_usuario: this.usuario.id,
      pais: 'Argentina'
    }  

    Object.keys(user).forEach((obj: any) => user[obj] = user[obj] ? user[obj] : null) 
    if(!this.data){
      delete user.id
      this.familiaresService.postFamiliar(user).subscribe((resp:any) => {
       (resp:any) => console.log(resp)
    })
    }else{
      this.familiaresService.updateFamiliar(user).subscribe((resp:any) => {
        (resp:any) => console.log(resp)
     })
    }
    this.dialogRef.close(true);
  }

  openDialog(){
    const dialogRef = this.dialog.open(TerminosCondicionesComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
         this.form.patchValue({checked: true})
      }
    });
  }

  checkState($event: any){
      if($event.checked === true){
         this.form.patchValue({checked: true})
      }else{
        this.form.patchValue({checked: false})
      }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  getProvincias(){
    this.http.get('https://apis.datos.gob.ar/georef/api/provincias').subscribe((provincias: any)=>{
        provincias.provincias.forEach((prov: any) => {
           this.listaProvincias.push(prov.nombre);
        });
    })
  }

  getLocalidades(provincia: any){
    this.listaDepartamentos = [];
    this.http.get('https://apis.datos.gob.ar/georef/api/departamentos?provincia='+provincia.value+'&max=999').subscribe((departamentos: any)=>{
        departamentos.departamentos.forEach((depa: any) => {
          if(depa.id == 38021){
            depa.nombre = "San Salvador de Jujuy"
          }
          this.listaDepartamentos.push(depa.nombre);
        });
        console.log(this.listaDepartamentos)
   }) 
  }
}
