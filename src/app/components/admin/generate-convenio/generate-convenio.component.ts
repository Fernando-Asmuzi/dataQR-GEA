import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-convenio',
  templateUrl: './generate-convenio.component.html',
  styleUrls: ['./generate-convenio.component.scss']
})
export class GenerateConvenioComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    email: ['', [Validators.email]],
    cuit: ['']
  })
   
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateConvenioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        id: this.data.id,
        nombre: this.data.nombre,
        telefono: this.data.telefono,
        email: this.data.email,
        cuit: this.data.cuil
      });
    }
  }

  submitForm(): void {
    this.dialogRef.close(this.form.getRawValue());
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
