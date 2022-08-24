import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-lote',
  templateUrl: './delete-lote.component.html',
  styleUrls: ['./delete-lote.component.scss']
})
export class DeleteLoteComponent implements OnInit {

  form: FormGroup = this.fb.group({
    motivo: ['', [Validators.required]]
  })
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DeleteLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
