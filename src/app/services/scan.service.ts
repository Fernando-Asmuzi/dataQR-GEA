import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Scan } from '../models/scan';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  private urlBase = environment.url_servicios;

  constructor(
    private http: HttpClient
  ) { }

  saveScan(scan: Scan): Observable<Scan> {
    delete scan.fecha;
    return this.http.post<Scan>(`${this.urlBase}scan.php`, scan);
  }
}
