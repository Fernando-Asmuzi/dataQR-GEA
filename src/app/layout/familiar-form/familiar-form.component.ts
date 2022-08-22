import { Component, Inject, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-familiar-form',
  templateUrl: './familiar-form.component.html',
  styleUrls: ['./familiar-form.component.scss']
})
export class FamiliarFormComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    id_usuario: [''],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    direccion_primaria: ['', [Validators.required]],
    direccion_secundaria: [''],
    telefono_primario: ['', [Validators.required, Validators.maxLength(10), Validators.maxLength(10)]],
    telefono_secundario: ['', [Validators.maxLength(10), Validators.maxLength(10)]],
    documento: ['', [Validators.required, Validators.maxLength(7), Validators.maxLength(8)]],
    diagnostico: [''],
    medicacion: [''],
    alergias: [''],
    factor_sangre: [''],
    otros: [''],
    provincia: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
  })

  
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
  
  constructor(private http: HttpClient, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FamiliarFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {

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
    }
    this.getProvincias();
    
  }

  submitForm(): void {
    this.dialogRef.close(this.form.value);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  getProvincias(){
    this.http.get('https://apis.datos.gob.ar/georef/api/provincias').subscribe((provincias: any)=>{
        this.listaProvincias = provincias.provincias
    })
  }

  getLocalidades(provincia: any){
    this.http.get('https://apis.datos.gob.ar/georef/api/departamentos?provincia='+provincia.value).subscribe((departamentos: any)=>{
        this.listaDepartamentos = departamentos.departamentos
        console.log(departamentos)
   }) 
  }
}
