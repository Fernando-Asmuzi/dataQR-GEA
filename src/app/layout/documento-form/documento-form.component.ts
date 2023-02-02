import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-documento-form',
  templateUrl: './documento-form.component.html',
  styleUrls: ['./documento-form.component.scss']
})
export class DocumentoFormComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    id_familiar: [],
    nombre: ['', Validators.required],
    documento: []
  });

  progress: number = 0;

  documentosSubscription!: Subscription;

  documentos: any[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private imagesService: ImagesService,
    private documentosService: DocumentosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDocumentos();
  }

  ngOnDestroy(): void {
    this.documentosSubscription && this.documentosSubscription.unsubscribe();
  }

  getDocumentos(): void {
    this.documentosSubscription = this.documentosService.getDocumentoByFamiliar(this.data.id).subscribe(
      resp => this.documentos = resp.body
    )
  }

  submitForm(): void {
    this.documentosSubscription = this.documentosService.postDocumento(this.form.value).subscribe(
      resp => {
        if (resp) {
          this.snackBar.open(`Documento agregado correctamente`, 'Aceptar', {duration: 1500})
          this.dialog.closeAll();
        }
      }
    );
  }

  uploadDocument(event: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      let document = {
        tipo: 'documentos',
        encodedDocument: myReader.result as string
      }
      this.imagesService.uploadDocument(document).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              let total = Number(event?.total);
              this.progress = Math.round(event.loaded / total * 100);
              break;
            case HttpEventType.Response:
              this.form.patchValue({
                documento: event.body.data,
                id_familiar: this.data.id
              });
              this.progress = 0;
              break;
          }
        }
      )
    }
  }

}
