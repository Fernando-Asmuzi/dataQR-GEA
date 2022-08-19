import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emptyImage, Image } from 'src/app/models/image';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-generate-marco',
  templateUrl: './generate-marco.component.html',
  styleUrls: ['./generate-marco.component.scss']
})
export class GenerateMarcoComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    imagen: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  })

  progress: number = 0;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateMarcoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imagesService: ImagesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        id: this.data.id,
        imagen: this.data.imagen,
        descripcion: this.data.descripcion
      });
    }
  }

  submitForm(): void {
    this.dialogRef.close(this.form.value);
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
      image.tipo = "marcos";

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
                  imagen: event.body.data,
                });
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
