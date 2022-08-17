import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marco } from '../models/marco';

@Injectable({
  providedIn: 'root'
})
export class MarcosService {

  private baseUri = environment.url_servicios;
  
  constructor(
    private http: HttpClient
  ) { }

  getAllMarcos(): Observable<Marco[]> {
    return this.http.get<Marco[]>(`${this.baseUri}marcos.php`);
  }

  deleteMarco(marco: Marco): Observable<Marco> {
    return this.http.delete<Marco>(`${this.baseUri}marcos.php?id=${marco.id}`);
  }
}
