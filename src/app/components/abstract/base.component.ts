import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../admin/dialog/dialog.component';

@Component({
  template: ''
})
export class BaseComponent {

  constructor(
    public dialog: MatDialog
  ) { }

  showBasicDialog(title: string, content: string): MatDialogRef<any> {
    const dialogData = {
        title: title,
        content: content
    }
    return this.dialog.open(DialogComponent, {
        data: dialogData
    });
  }
}
