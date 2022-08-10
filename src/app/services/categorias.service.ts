import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private baseUri = environment.url_servicios;
  
  constructor(
    private http: HttpClient
  ) { }

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUri}categorias.php`);
  }
}
