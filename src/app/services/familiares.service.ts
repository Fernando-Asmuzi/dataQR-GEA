import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Familiar } from 'src/app/models/familiar';
import { Mascota } from '../models/mascota';

const cudOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class FamiliaresService {
  private urlBase = environment.url_servicios;
  
  constructor(public http: HttpClient) { }

  getFamiliares(id: Number): Observable<any>{
     return this.http.get<Familiar[]>(`${this.urlBase}familiares.php?id_usuario=${id}`)
  }

  postFamiliar(familiar: any): Observable<Familiar> {
    return this.http.post<Familiar>(`${this.urlBase}familiares.php`, familiar);
  }

  updateFamiliar(familiar: any): Observable<Familiar> {
    return this.http.put<Familiar>(`${this.urlBase}familiares.php`, familiar);
  }

  deleteFamiliar(familiar: Familiar): Observable<Familiar> {
    return this.http.delete<Familiar>(`${this.urlBase}familiares.php?id=${familiar.id}`);
  }

  postMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.urlBase}mascotas.php`, mascota);
  }
  
  updateMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.urlBase}mascotas.php`, mascota);
  }
}
