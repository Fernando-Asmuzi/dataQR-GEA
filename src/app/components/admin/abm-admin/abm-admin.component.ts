import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActionButton } from 'src/app/models/actionButton';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BaseComponent } from '../../abstract/base.component';

@Component({
  selector: 'app-abm-admin',
  templateUrl: './abm-admin.component.html',
  styleUrls: ['./abm-admin.component.scss']
})
export class AbmAdminComponent extends BaseComponent implements OnInit, OnDestroy {

  usuariosSubscription!: Subscription;

  usuarios: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

  columnasTabla: string[] = ['id','user_login', 'user_email', 'display_name', 'admin', 'actions'];
  
  actionButtons: ActionButton[] = [
    {
      icon: 'verified_user',
      color: 'primary',
      tooltip: 'Editar permisos'
    },
  ];

  constructor(
    private usuarioService: UsuarioService,
    public override dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  ngOnDestroy(): void {
    this.usuariosSubscription && this.usuariosSubscription.unsubscribe();
  }

  loadUsuarios(): void {
    this.usuariosSubscription = this.usuarioService.getAllUsuarios().subscribe(
      response => this.usuarios.data = response
    );
  }

  editAdmin(usuario: Usuario): void {
    const mensaje = usuario.admin ? 'baja': 'alta';
    this.showBasicDialog('Atención', 'Dará de ' + mensaje + ' como administrador al usuario ' + usuario.display_name +', confirme.').afterClosed().subscribe(
      response => {
        if (response) {
          usuario.admin = !usuario.admin;
          this.usuariosSubscription = this.usuarioService.updateAdmin(usuario).subscribe(
            response => {
              if (response) {
                this.snackBar.open('Usuario editado', 'Aceptar', {duration: 1500});
                this.loadUsuarios();
              }
            }
          );
        }
      }
    );
  }

}
