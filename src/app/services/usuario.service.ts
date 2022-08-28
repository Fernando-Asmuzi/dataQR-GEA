import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';


const cudOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = 'https://geadata.com.ar/api/';
  
  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

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
    return localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin') || '{}') : null;
  }

  logOut(): void {
    localStorage.removeItem('userLogin');
    localStorage.removeItem('registro');
  } 

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlBase}usuarios.php`);
  }

  updateAdmin(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlBase}usuarios.php`, usuario)
  }

  checkedLoggedUser(): boolean {
    let isLogged = this.getUserLogin();

    if (isLogged) {
      this.getUsuarioId(isLogged.id).subscribe(
        resp => {
          this.setUserLogin(resp);
          this.router.navigate(['/principal/'+ isLogged.id]);
          return true;
        }
      )
    }
    return false;
  }

  checkAdmin(): void {
    let isLogged = this.getUserLogin();
    if (isLogged) {
      this.getUsuarioId(isLogged.id).subscribe(
        resp => {
          this.setUserLogin(resp);
          this.router.navigate(['/principal/'+ isLogged.id]);
        }
      )
    }
  }

}
