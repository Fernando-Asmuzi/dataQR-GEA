import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActionButton } from 'src/app/models/actionButton';
import { Diseno } from 'src/app/models/diseno';
import { DisenoService } from 'src/app/services/diseno.service';
import { BaseComponent } from '../../abstract/base.component';

@Component({
  selector: 'app-abm-diseno',
  templateUrl: './abm-diseno.component.html',
  styleUrls: ['./abm-diseno.component.scss']
})
export class AbmDisenoComponent extends BaseComponent implements OnInit {

  disenos: MatTableDataSource<Diseno> = new MatTableDataSource<Diseno>();
  columnasTabla: string[] = ['id','nombre','descripcion', 'actions'];
  actionButtons: ActionButton[] = [
    {
      icon: 'edit',
      color: 'primary',
      tooltip: 'Editar'
    },
    {
      icon: 'delete',
      color: 'warn',
      tooltip: 'Eliminar'
    },
  ]
  
  constructor(
    private disenoService: DisenoService,
    public override dialog: MatDialog
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.disenoService.getAllDisenos().subscribe(
      response => this.disenos.data = response
    )
  }

  editDiseno(diseno: Diseno): void {

  }

  deleteDiseno(diseno: Diseno): void {
    this.showBasicDialog('Atención', 'Va a borrar un diseño, confirme eliminación').afterClosed().subscribe(
      response => console.log(response)
    )
  }

}
