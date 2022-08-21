import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lote } from '../models/lote';

@Injectable({
  providedIn: 'root'
})
export class LotesService {

  private baseUri = environment.url_servicios;

  constructor(
    private http: HttpClient
  ) {
  }

  getAllLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.baseUri}lotes.php`);
  }

  getLoteByCod(codigo: number): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.baseUri}lotes.php?codigo=${codigo}`);
  }

  getLoteById(lote: Lote): Observable<Lote> {
    return this.http.get<Lote>(`${this.baseUri}lotes.php?id=${lote.id}`);
  }

  getLoteForCodes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.baseUri}lotes.php?bylote=true`);
  }

  updateLotes(lote: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${this.baseUri}lotes.php`, lote);
  }

  createLote(lote: Lote): Observable<Lote> {
    return this.http.post<Lote>(`${this.baseUri}lotes.php`, lote);
  }

  delete(lote: Lote): Observable<Lote> {
    return this.http.delete<Lote>(`${this.baseUri}lotes.php?codigo=${lote.codigo}`);
  }
}
