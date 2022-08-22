import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-categoria',
  templateUrl: './generate-categoria.component.html',
  styleUrls: ['./generate-categoria.component.scss']
})
export class GenerateCategoriaComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    categoria: ['', [Validators.required]],
  })
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        id: this.data.id,
        categoria: this.data.categoria,
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
