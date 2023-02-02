import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseUri = environment.url_servicios;

  constructor(
    private http: HttpClient
  ) {
  }

  uploadImage(image: Image): Observable<any>{
    return this.http.post<Image>(`${this.baseUri}imagenes.php`, image, { reportProgress: true, observe: 'events' });
  }

  uploadDocument(document: any): Observable<any> {
    return this.http.post<any>(`${this.baseUri}documentos.php`, document, { reportProgress: true, observe: 'events' });
  }

}
