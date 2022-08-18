import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-producto',
  templateUrl: './generate-producto.component.html',
  styleUrls: ['./generate-producto.component.scss']
})
export class GenerateProductoComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: [''],
    producto: ['', [Validators.required]],
    imagen: ['', [Validators.required]]
  })
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        id: this.data.id,
        producto: this.data.producto,
        imagen: this.data.imagen
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
