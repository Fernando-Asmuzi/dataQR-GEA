import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vinculo } from '../models/vinculo'
import { Familiar } from 'src/app/models/familiar'

@Injectable({
  providedIn: 'root'
})
export class VinculacionService {

  private urlBase = environment.url_servicios;

  constructor(public http: HttpClient) { }

  getVinculoFamiliar(id: any): Observable<any>{
    return this.http.get<Vinculo[]>(`${this.urlBase}vinculacion.php?id_usuario=${id}`);
  }

  getFamiliarByLoteId(id: any): Observable<Familiar>{
    return this.http.get<Familiar>(`${this.urlBase}vinculacion.php?id_lote=${id}`);
  }

}
