import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {

  transform(usuario: Usuario): unknown {
    return usuario.admin ? 'Administrador' : 'Usuario común';
  }

}
