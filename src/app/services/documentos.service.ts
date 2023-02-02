import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private urlBase = environment.url_servicios;

  constructor(
    private http: HttpClient
  ) { }

  getDocumentosById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}data-documentos.php?id=${id}`);
  }

  getAllDocumentos(): Observable<any> {
    return this.http.get<any>(`${this.urlBase}data-documentos.php`);
  }

  postDocumento(documento: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}data-documentos.php`, documento);
  }

  deleteDocumento(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}data-documentos.php?id=${id}`);
  }

  getDocumentoByFamiliar(id_familiar: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}data-documentos.php?id_familiar=${id_familiar}`);
  }
}
