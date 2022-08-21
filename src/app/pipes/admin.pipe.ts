import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {

  transform(admin: any): unknown {
    return admin ? 'Administrador' : 'Usuario común';
  }

}
