import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-diseno',
  templateUrl: './generate-diseno.component.html',
  styleUrls: ['./generate-diseno.component.scss']
})
export class GenerateDisenoComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  })
   
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateDisenoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        id: this.data.id,
        nombre: this.data.nombre,
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

}
