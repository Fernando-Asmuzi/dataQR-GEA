import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as JSZip from 'jszip';
import { toBlob } from 'html-to-image';
import { LotesService } from 'src/app/services/lotes.service';
import { Lote } from 'src/app/models/lote';
import { saveAs
 } from 'file-saver';
@Component({
  selector: 'app-qrs',
  templateUrl: './qrs.component.html',
  styleUrls: ['./qrs.component.scss']
})
export class QrsComponent implements OnInit {

  lotes: any;

  sizes = [
    {
      value: 171,
      viewValue: "1,5x1,5 cm"
    },
    {
      value: 295,
      viewValue: "2,5x2,5 cm"
    },
    {
      value: 591,
      viewValue: "5x5 cm"
    },
  ];

  plantilla: string = 'hueso';

  ancho!: number;

  sizeControl = new FormControl(this.sizes[0], Validators.required);

  @ViewChildren('qrs') qrs!: ElementRef;

  showSpinner: boolean = false;

  constructor(
    private lotesService: LotesService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (resp: any) => {
        this.lotesService.getLoteByCod(resp.codigo).subscribe(
          response => {
            this.lotes = response;
          }
        )
      }
    )
  }


  async downloadQR(): Promise<void> {
    

    this.createDomElement()
    // setTimeout(() => {

      
    // }, 20000);

      

  }

  async createDomElement(): Promise<void> {

    this.showSpinner = true;
    let zip = new JSZip();
    let img = zip.folder("images");

    const dataURItoBlob = (dataURI: any) => {
      let byteString = atob(dataURI.split(',')[1]);
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      let bb = new Blob([ab]);
      return bb;
    }
    
    

    await this.lotes.map((lote: Lote, index: number) => {
      // const div = document.createElement('div');
      let qr = document.getElementById(lote.id.toString());
      const canvas = <HTMLCanvasElement> qr?.firstChild;
      // console.log(canvas.toDataURL());
      
      let par = document.createElement('span');
      par.innerHTML = lote.id.toString();

      let indice;
      // canvas.setAttribute('style','background-color: #ffffff')
      // const code = document.createElement('img');
      // code.setAttribute('id','codigo' + lote.id);
      let width = 267;
      let height = 389;
      toBlob(canvas, {width: width, height: height})
      .then( (data: any) => {
				img!.file(lote.id+".png", data, {base64: true});
        indice = index + 1;
        if (this.lotes.length === indice) {
          zip.generateAsync({type:"blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(
            (content: any) => {
              saveAs(content, 'codigos.zip')
              this.showSpinner = false;
            }
          );
        }
			})
			.catch(function (error){
        console.log('ocurrio un error', error);
			})

      
    })

    
    
  }

  onCreatedItem(item: any): void {
    // console.log(item);
  }

  
}
