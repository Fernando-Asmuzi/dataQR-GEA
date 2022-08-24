import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Familiar } from 'src/app/models/familiar';
import { FamiliaresService } from 'src/app/services/familiares.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VinculacionService } from 'src/app/services/vinculacion.service';


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
    fecha: ['']
  })
  
  registro: any;
  familiares: Array<Familiar> = [];
  id: String | null = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateVinculacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private familiaresService: FamiliaresService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private vinculacionService: VinculacionService
    ) { }

  ngOnInit(): void {

    
    this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : this.usuarioService.getUserLogin()?.id;
    
    /* this.registro = JSON.parse(localStorage.getItem("registro") || '') */
    this.familiaresService.getFamiliares(Number(this.id)).subscribe(response =>{
      this.familiares = response
    })

   if (this.data) {
    this.form.patchValue({

      id: this.data.id,
      id_lote: this.registro.id,
      id_familiar: this.data.id_familiar,
      fecha: this.data.fecha,

    });
  }
  }

  submitForm(): void {

    let vinculo = this.form.value

    vinculo = {...vinculo,
       fecha: new Date()
    }
    console.log(vinculo)
    this.vinculacionService.postVinculacion(vinculo)
    this.dialogRef.close(this.form.value);
    localStorage.removeItem('registro');
  }

  cancel(): void {
    this.dialogRef.close(false);
    localStorage.removeItem('registro');
  }

}
