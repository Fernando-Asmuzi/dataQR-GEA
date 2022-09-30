import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.scss']
})
export class TerminosCondicionesComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TerminosCondicionesComponent>,
  ) { }

  ngOnInit(): void {
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
