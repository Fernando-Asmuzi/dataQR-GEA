import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-diseno',
  templateUrl: './generate-diseno.component.html',
  styleUrls: ['./generate-diseno.component.scss']
})
export class GenerateDisenoComponent implements OnInit {

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  })
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateDisenoComponent>
  ) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.dialogRef.close(this.form.value);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
