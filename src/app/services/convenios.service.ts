import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Convenio } from '../models/convenio';

@Injectable({
  providedIn: 'root'
})
export class ConveniosService {

  private baseUri = environment.url_servicios;
  
  constructor(
    private http: HttpClient
  ) { }

  getAllConvenios(): Observable<Convenio[]> {
    return this.http.get<Convenio[]>(`${this.baseUri}convenios.php`);
  }

  getConvenioById(diseno: Convenio): Observable<Convenio> {
    return this.http.get<Convenio>(`${this.baseUri}convenios.php?id=${diseno.id}`);
  }

  postConvenio(diseno: Convenio): Observable<Convenio> {
    return this.http.post<Convenio>(`${this.baseUri}convenios.php`, diseno);
  }
  
  deleteConvenio(diseno: Convenio): Observable<Convenio> {
    return this.http.delete<Convenio>(`${this.baseUri}convenios.php?id=${diseno.id}`);
  }

  putConvenio(diseno: Convenio): Observable<Convenio> {
    return this.http.put<Convenio>(`${this.baseUri}convenios.php`, diseno);
  }
}
