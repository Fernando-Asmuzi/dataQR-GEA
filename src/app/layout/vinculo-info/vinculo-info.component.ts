import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vinculo-info',
  templateUrl: './vinculo-info.component.html',
  styleUrls: ['./vinculo-info.component.scss']
})
export class VinculoInfoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<VinculoInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

}
