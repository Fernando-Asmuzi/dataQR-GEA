import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private baseUri = environment.url_servicios;
  
  constructor(
    private http: HttpClient
  ) { }

  getAllVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.baseUri}ventas.php`);
  }

  getVentaById(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.baseUri}ventas.php?id=${id}`);
  }
}
