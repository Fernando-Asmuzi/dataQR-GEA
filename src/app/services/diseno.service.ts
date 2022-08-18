import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Diseno } from '../models/diseno';

@Injectable({
  providedIn: 'root'
})
export class DisenoService {

  private baseUri = environment.url_servicios;
  
  constructor(
    private http: HttpClient
  ) { }

  getAllDisenos(): Observable<Diseno[]> {
    return this.http.get<Diseno[]>(`${this.baseUri}diseno.php`);
  }

  getDisenoById(diseno: Diseno): Observable<Diseno> {
    return this.http.get<Diseno>(`${this.baseUri}diseno.php?id=${diseno.id}`);
  }

  postDiseno(diseno: Diseno): Observable<Diseno> {
    return this.http.post<Diseno>(`${this.baseUri}diseno.php`, diseno);
  }
  
  deleteDiseno(diseno: Diseno): Observable<Diseno> {
    return this.http.delete<Diseno>(`${this.baseUri}diseno.php?id=${diseno.id}`);
  }

  putDiseno(diseno: Diseno): Observable<Diseno> {
    return this.http.put<Diseno>(`${this.baseUri}diseno.php`, diseno);
  }
}
