import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loteBloqueado'
})
export class LoteBloqueadoPipe implements PipeTransform {

  transform(bloqueado: any): unknown {
    return bloqueado ? 'Bloqueado' : 'Desbloqueado';
  }

}
