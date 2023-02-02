import { Component, Inject, OnInit } from '@angular/core';

import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { emptyFamiliar, Familiar } from 'src/app/models/familiar';
import { TerminosCondicionesComponent } from '../terminos-condiciones/terminos-condiciones.component';
import { BaseComponent } from 'src/app/components/abstract/base.component';
import { Image, emptyImage } from 'src/app/models/image';
import { ImagesService } from 'src/app/services/images.service';
import { MatSnackBar } from '@angular/material/snack-bar';



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
    direccion_secundaria: ['', []],
    telefono_primario: ['', [Validators.required]],
    telefono_secundario: ['', []],
    documento_tipo: ['', [Validators.required]],
    documento: ['', [Validators.required]],
    diagnostico: ['', []],
    medicacion: ['', []],
    alergias: ['', []],
    factor_sangre: ['', []],
    otros: ['', []],
    provincia: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    checked: ['', [Validators.requiredTrue]],
    foto: ['']
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

  progress: number = 0;
  
  constructor(private http: HttpClient, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FamiliarFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private familiaresService: FamiliaresService,
    private usuarioService: UsuarioService,
    public override dialog: MatDialog,
    private imagesService: ImagesService,
    private snackBar: MatSnackBar
    ) { super(dialog); }

  ngOnInit(): void {
    
    this.usuario = this.usuarioService.getUserLogin();
    // this.getProvincias();

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
        documento_tipo: this.data.documento_tipo,
        diagnostico: this.data.diagnostico,
        medicacion: this.data.medicacion,
        alergias: this.data.alergias,
        factor_sangre: this.data.factor_sangre,
        otros: this.data.otros,
        provincia: this.data.provincia,
        pais: this.data.pais,
        ciudad: this.data.ciudad,
        checked: true,
        foto: this.data.foto
      });
      let localidad = {
        value: this.data.provincia
      }
      // this.getLocalidades(localidad);
    }
    this.form.patchValue({
      id_usuario: this.usuario.id
    })
  }

  submitForm(): void {
    

    let familiar = emptyFamiliar();
    familiar.nombre = this.form.value.nombre
    familiar.apellido = this.form.value.apellido
    familiar.documento_tipo = this.form.value.documento_tipo
    familiar.documento = this.form.value.documento
    familiar.direccion_primaria = this.form.value.direccion_primaria
    familiar.direccion_secundaria = this.form.value.direccion_secundaria
    familiar.provincia = this.form.value.provincia
    familiar.ciudad = this.form.value.ciudad
    familiar.pais = this.form.value.pais
    familiar.telefono_primario = this.form.value.telefono_primario
    familiar.telefono_secundario = this.form.value.telefono_secundario
    familiar.factor_sangre = this.form.value.factor_sangre
    familiar.alergias = this.form.value.alergias
    familiar.diagnostico = this.form.value.diagnostico
    familiar.medicacion = this.form.value.medicacion
    familiar.otros = this.form.value.otros
    familiar.id_usuario = this.form.value.id_usuario
    familiar.foto = this.form.value.foto

    let requestResponse = false;
    if(!this.data){
      this.familiaresService.postFamiliar(familiar).subscribe(resp => {
        if(resp) {
          requestResponse = true;
        }
        this.dialogRef.close(requestResponse);
      },
      error => this.dialogRef.close(requestResponse))
    }else{
      familiar.id = this.data.id
      this.familiaresService.updateFamiliar(familiar).subscribe(resp => {
        if(resp) {
          requestResponse = true;
        }
        this.dialogRef.close(requestResponse);
     },
     error => this.dialogRef.close(requestResponse))
    }
    
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

  uploadImage(event: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      let image: Image = emptyImage();
      image.encodedImage = myReader.result as string;
      image.tipo = "familiares";

      // console.log(image)
      this.imagesService.uploadImage(image).subscribe(

        (event: HttpEvent<any>) =>{
          switch (event.type) {
            case HttpEventType.UploadProgress:
              let total = Number(event?.total);
              this.progress = Math.round(event.loaded / total * 100)
              break;
            case HttpEventType.Response:
              if (event.body.statusMessage != 'existe') {
                // this.form.controls['imagen'].setValue(event.body.data);
                this.form.patchValue({
                  foto: event.body.data
                })
              } else {
                this.snackBar.open('Imagen invalida, use otra','Aceptar',{duration: 1500})
              }
              this.progress = 0
          }
        }


      )
    }
  }
}
