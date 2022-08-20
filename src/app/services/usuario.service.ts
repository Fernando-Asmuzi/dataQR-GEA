import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario';


const cudOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = 'http://geadata.com.ar/api/';
  
  constructor(public http: HttpClient) { }

  postUsuario(usuario: any): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlBase}login.php`, usuario);
  }

  getUsuario(user: any): Observable<any>{
    return this.http.get<Usuario[]>(`${this.urlBase}usuarios.php?user_login=${user}`);
  } 

  getUsuarioId(id: any): Observable<any>{
    return this.http.get<Usuario[]>(`${this.urlBase}usuarios.php?id=${id}`);
  }

  setUserLogin(user: any): void {
    localStorage.setItem('userLogin', JSON.stringify(user));
  }

  getUserLogin(): any {
    return JSON.parse(localStorage.getItem('userLogin') || '{}');
  }

  logOut(): void {
    localStorage.removeItem('userLogin');
  }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlBase}usuarios.php`);
  }

  updateAdmin(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlBase}usuarios.php`, usuario)
  }

}
