import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';


const cudOptions = {
  headers: new HttpHeaders({'Content-Type':'appication/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private urlBase = environment.url_servicios;
  private apiProductos = this.urlBase + '/';

  constructor(public http: HttpClient) { }

      getProducto(id: any): Observable<any>{
        return this.http.get<Producto[]>(`${this.urlBase}vinculacion.php?id_usuario=${id}`);
      }

}
