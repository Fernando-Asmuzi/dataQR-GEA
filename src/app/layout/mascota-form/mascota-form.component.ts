import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Image, emptyImage } from 'src/app/models/image';
import { emptyMascota, Mascota } from 'src/app/models/mascota';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { ImagesService } from 'src/app/services/images.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TerminosCondicionesComponent } from '../terminos-condiciones/terminos-condiciones.component';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.scss']
})
export class MascotaFormComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    id: [''],
    id_usuario: [''],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    direccion_primaria: ['', [Validators.required]],
    direccion_secundaria: ['', []],
    telefono_primario: ['', [Validators.required]],
    telefono_secundario: ['', []],
    otros: ['', []],
    provincia: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    especie: [''],
    raza: [''],
    caracteristicas: [''],
    checked: ['', [Validators.requiredTrue]],
    foto: ['']
  })

  usuario: any;
  
  listaProvincias: any[] = [];
  listaDepartamentos: any[] = [];

  mascotasSubscription!: Subscription;

  mascota: Mascota = emptyMascota();

  progress: number = 0;
  
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private familiaresService: FamiliaresService,
    private dialogRef: MatDialogRef<MascotaFormComponent>,
    private snackBar: MatSnackBar,
    private imagesService: ImagesService
  ) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUserLogin();
    if(this.data){
      this.form.patchValue({
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        especie: this.data.especie,
        raza: this.data.raza,
        caracteristicas: this.data.caracteristicas,
        direccion_primaria: this.data.direccion_primaria,
        direccion_secundaria: this.data.direccion_secundaria,
        provincia: this.data.provincia,
        ciudad: this.data.ciudad,
        pais: this.data.pais,
        telefono_primario: this.data.telefono_primario,
        telefono_secundario: this.data.telefono_secundario,
        otros: this.data.otros,
        foto: this.data.foto,
        checked: true
      })
    }
  }

  ngOnDestroy(): void {
    this.mascotasSubscription && this.mascotasSubscription.unsubscribe();
  }

  checkState($event: any){
    this.form.patchValue({checked: $event.checked});
  }

  openDialog(){
    const dialogRef = this.dialog.open(TerminosCondicionesComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.form.patchValue({checked: true})
      }
    });
  }

  submitForm(): void {
    console.log(this.form.value)
    this.mascota.nombre = this.form.value.nombre;
    this.mascota.apellido = this.form.value.apellido;
    this.mascota.direccion_primaria = this.form.value.direccion_primaria;
    this.mascota.direccion_secundaria = this.form.value.direccion_secundaria;
    this.mascota.provincia = this.form.value.provincia;
    this.mascota.ciudad = this.form.value.ciudad;
    this.mascota.telefono_primario = this.form.value.telefono_primario;
    this.mascota.telefono_secundario = this.form.value.telefono_secundario;
    this.mascota.otros = this.form.value.otros;
    this.mascota.id_usuario = this.usuario.id;
    this.mascota.pais = this.form.value.pais;
    this.mascota.especie = this.form.value.especie;
    this.mascota.raza = this.form.value.raza;
    this.mascota.caracteristicas = this.form.value.caracteristicas;
    console.log(this.mascota)

    let requestResponse = false;

    if(!this.data){
      this.mascotasSubscription = this.familiaresService.postMascota(this.mascota).subscribe(
        response => {
          if(response) {
            requestResponse = true;
          }
        }
      )
    } else {
      this.mascota.id = this.data.id;
      this.mascotasSubscription = this.familiaresService.updateMascota(this.mascota).subscribe(
        response => {
          if(response) {
            requestResponse = true;
          }
        }
      )
    }
    this.dialogRef.close(true);
  }

  uploadImage(event: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      let image: Image = emptyImage();
      image.encodedImage = myReader.result as string;
      image.tipo = "mascotas";

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
                this.mascota.foto = event.body.data
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
