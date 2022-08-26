import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as JSZip from 'jszip';
import { toBlob } from 'html-to-image';
import { LotesService } from 'src/app/services/lotes.service';
import { Lote } from 'src/app/models/lote';
import { saveAs } from 'file-saver';
import { emptyMarco, Marco } from 'src/app/models/marco';
import { MarcosService } from 'src/app/services/marcos.service';
import { finalize, Subscription } from 'rxjs';
import { BaseComponent } from '../../abstract/base.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-qrs',
  templateUrl: './qrs.component.html',
  styleUrls: ['./qrs.component.scss']
})
export class QrsComponent extends BaseComponent implements OnInit, OnDestroy {

  lotes: any;

  marcos: Marco[] = [];

  defaultMarco: Marco = emptyMarco();

  plantilla: string = 'hueso';

  ancho!: number;

  hasLogo!: boolean;
  marco!: Marco;

  @ViewChildren('qrs') qrs!: ElementRef;

  showSpinner: boolean = false;

  lotesSubscription!: Subscription;
  marcosSubscription!: Subscription;

  constructor(
    private lotesService: LotesService,
    private marcosService: MarcosService,
    private activateRoute: ActivatedRoute,
    public override dialog: MatDialog
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.activateRoute.params.subscribe(
      (resp: any) => {
        this.lotesSubscription = this.lotesService.getLoteByCod(resp.codigo).pipe(
          finalize( () => this.showSpinner = false),
        ).subscribe(
          response => {
            this.lotes = response;
          }
        )
      }
    )

    this.marcosSubscription = this.marcosService.getAllMarcos().subscribe(
      response => {
        let vacio: Marco = emptyMarco();
        response.unshift(vacio);
        this.marcos = response;
      }
    )
  }

  ngOnDestroy(): void {
    this.lotesSubscription && this.lotesSubscription.unsubscribe();
    this.marcosSubscription && this.marcosSubscription.unsubscribe();
  }

  async downloadQR(): Promise<void> {

    this.showSpinner = true;
    let zip = new JSZip();
    let img = zip.folder("images");

    await this.lotes.map((lote: Lote, index: number) => {
      let qr = document.getElementById(lote.id.toString());
      const canvas = <HTMLCanvasElement> qr?.firstChild;
      
      let par = document.createElement('span');
      par.innerHTML = lote.id.toString();

      let indice;
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
              saveAs(content, 'codigos.zip')
              this.showSpinner = false;
            }
          );
        }
			})
			.catch((error) => {
        this.showBasicDialog('Error', 'Ocurrió un error al generar el archivo, intente nuevamente.')
        // console.log(error);
			})
    })
  }

  setIsologo(event: any): void {
    this.hasLogo = event.checked
  }

  onSelectionChange(marco: Marco): void {
    this.marco = marco;
  }
  
}
