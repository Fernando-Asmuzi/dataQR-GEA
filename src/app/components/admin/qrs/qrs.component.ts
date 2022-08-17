import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as JSZip from 'jszip';
import { toBlob } from 'html-to-image';
import { LotesService } from 'src/app/services/lotes.service';
import { Lote } from 'src/app/models/lote';
import { saveAs
 } from 'file-saver';
import { Marco } from 'src/app/models/marco';
import { MarcosService } from 'src/app/services/marcos.service';
@Component({
  selector: 'app-qrs',
  templateUrl: './qrs.component.html',
  styleUrls: ['./qrs.component.scss']
})
export class QrsComponent implements OnInit {

  lotes: any;

  marcos: Marco[] = [];

  plantilla: string = 'hueso';

  ancho!: number;

  hasLogo!: boolean;
  marco!: Marco;

  @ViewChildren('qrs') qrs!: ElementRef;

  showSpinner: boolean = false;

  constructor(
    private lotesService: LotesService,
    private marcosService: MarcosService,
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

    this.marcosService.getAllMarcos().subscribe(
      response => {
        let vacio: Marco = {
          id: 0,
          url: '',
          descripcion: 'Sin marco'
        }
        response.unshift(vacio);
        this.marcos = response;
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
      // plantilla hueso
      // let width = 267;
      // let height = 389;
      // codigo sin marcos
      // let width = 84;
      // let height = 84;
      // codigo con marco
      const frame = document.getElementById('qrContainer');
      let width = frame?.offsetWidth;
      let height = frame?.offsetHeight;
      toBlob(canvas, {width: width, height: height})
      .then( (data: any) => {
				img!.file(lote.id+".png", data, {base64: true});
        indice = index + 1;
        if (this.lotes.length === indice) {
          zip.generateAsync({type:"blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(
            (content: any) => {
              // setTimeout(() => {
                saveAs(content, 'codigos.zip')
                this.showSpinner = false;
              // }, 5000);
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

  setIsologo(event: any): void {
    this.hasLogo = event.checked
  }

  onSelectionChange(event: any): void {
    this.marco = event.value;
  }
  
}
