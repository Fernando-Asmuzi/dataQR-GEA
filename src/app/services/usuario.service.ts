import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario';

const cudOptions = {
  headers: new HttpHeaders({'Content-Type':'appication/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = environment.url_servicios;
  
  constructor(public http: HttpClient) { }

  getUsuario(user: any): Observable<any>{
    return this.http.get<Usuario[]>(`${this.urlBase}usuarios.php?user_login=${user}`);
  } 
}
