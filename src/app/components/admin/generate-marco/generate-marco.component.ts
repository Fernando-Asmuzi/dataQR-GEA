import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateMarcoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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

}
