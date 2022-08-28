import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Familiar } from 'src/app/models/familiar';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VinculacionService } from 'src/app/services/vinculacion.service';
import { emptyUsuario, Usuario } from 'src/app/models/usuario';
import { FamiliarFormComponent } from '../familiar-form/familiar-form.component';
import { LotesService } from 'src/app/services/lotes.service';
import { emptyLote, Lote } from 'src/app/models/lote';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-generate-vinculacion',
  templateUrl: './generate-vinculacion.component.html',
  styleUrls: ['./generate-vinculacion.component.scss']
})
export class GenerateVinculacionComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    id_lote: ['', [Validators.required]],
    id_familiar: ['', [Validators.required]],
  })
  
  registro: any;
  familiares: Array<Familiar> = [];
  usuario: Usuario = emptyUsuario();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateVinculacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private familiaresService: FamiliaresService,
    private usuarioService: UsuarioService,
    private lotesService: LotesService,
    private route: ActivatedRoute,
    private vinculacionService: VinculacionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUserLogin();
    
    this.registro = localStorage.getItem("registro") ? JSON.parse(localStorage.getItem("registro") || '') : null;
    this.getFamiliares();

    if (this.registro) {
      this.form.patchValue({
        id_lote: this.registro.id,
        id_familiar: this.data.id_familiar,
      });
      this.form.controls['id_lote'].disable({onlySelf: true});
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 1500});
  }

  submitForm(): void {
    let vinculo = {
      ...this.form.getRawValue()
    }
    let lote: Lote = emptyLote();
    lote = {...lote, id: vinculo.id_lote}
    this.lotesService.getLoteById(lote).subscribe(
      response => {
        lote = response
        if (lote.libre) {
          if (!this.data) {
            delete vinculo.id
          }
          this.vinculacionService.postVinculacion(vinculo).subscribe()
          this.dialogRef.close(this.form.value);
          localStorage.removeItem('registro');
        } else {
          this.form.controls['id_lote'].setErrors({invalidLote: true});
        }
      },error => { this.openSnackBar('Código incorrecto o inexistente', 'Aceptar');})
  }

  cancel(): void {
    this.dialogRef.close(false);
    localStorage.removeItem('registro');
  }

  getFamiliares(): void {
    this.familiaresService.getFamiliares(Number(this.usuario.id)).subscribe(response =>{
      if (response.code != 204) {
        this.familiares = response;
      }
    })
  }

  addFamiliar(): void {
    this.dialog.open(FamiliarFormComponent).afterClosed().subscribe(
      resp => {
        if (resp) {
          this.getFamiliares();
        }
      }
    )
  }

}
