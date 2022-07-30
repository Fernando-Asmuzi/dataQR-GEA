import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoLote'
})
export class EstadoLotePipe implements PipeTransform {

  transform(value: any): any {
    return typeof value === 'boolean' ? value ? 'En uso' : 'Libre'  : value;
  }

}
