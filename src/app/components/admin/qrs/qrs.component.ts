import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as JSZip from 'jszip';
import domtoimage from 'dom-to-image';
import { LotesService } from 'src/app/services/lotes.service';
import { Lote } from 'src/app/models/lote';

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

  ancho!: number;

  sizeControl = new FormControl(this.sizes[0], Validators.required);

  @ViewChildren('qrs') qrs!: ElementRef;

  constructor(
    private lotesService: LotesService,
    private activateRoute: ActivatedRoute,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
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
    let zip = new JSZip();
    let img = zip.folder("images");
    // console.log(qrlist);
    this.createDomElement(img);

    // zip.generateAsync({type: 'base64'}).then(
    //   (content) => window.location.href = 'data:application/zip;base64,' + content
    // );
  }

  createDomElement(img: any): void {
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
    
    this.lotes.map((lote: Lote) => {
      let container = document.createElement('div');
      let qr = document.createElement('qrcode');
      qr.setAttribute('qrdata', '{{ http://56.ar/' + lote.id + ' }}');
      qr.setAttribute('width',this.sizeControl.value?.value);
      qr.setAttribute('errorCorrectionLevel','M');
      
      let par = document.createElement('p');
      par.innerHTML = lote.id.toString();
      container.append(qr)
      container.append(par);
      console.log(container);

      domtoimage.toPng(container).then( function (data) {
        let image = new Image();
        image.setAttribute('src', data);
        img.file(lote.id + '.png', dataURItoBlob(image.getAttribute("src")), {base64: true} )
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