import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { emptyLote, Lote } from 'src/app/models/lote';
import { emptyMarco, Marco } from 'src/app/models/marco';
import { MarcosService } from 'src/app/services/marcos.service';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { toBlob } from 'html-to-image';
import { BaseComponent } from '../../abstract/base.component';
import { emptyFamiliar, Familiar } from 'src/app/models/familiar';
import { VinculacionService } from 'src/app/services/vinculacion.service';

@Component({
  selector: 'app-view-qr',
  templateUrl: './view-qr.component.html',
  styleUrls: ['./view-qr.component.scss']
})
export class ViewQRComponent extends BaseComponent implements OnInit, OnDestroy {

  lote: Lote = emptyLote();
  marcos: Array<Marco> = new Array<Marco>();
  marco: Marco = emptyMarco();
  hasLogo!: boolean;
  showSpinner: boolean = false;
  lotesSubscription!: Subscription;

  vinculacionSubscription!: Subscription;
  familiar: Familiar = emptyFamiliar();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private marcosService: MarcosService,
    public override dialog: MatDialog,
    private vinculacionService: VinculacionService
  ) {
    super(dialog)
  }

  ngOnInit(): void {
    this.lote = this.data;
    this.lotesSubscription = this.marcosService.getAllMarcos().subscribe(
      response => {
        let vacio: Marco = emptyMarco();
        response.unshift(vacio);
        this.marcos = response;
      }
    )
    this.vinculacionSubscription = this.vinculacionService.getFamiliarByLoteId(this.lote.id).subscribe(
      response => {
        if (response.id) {
          this.familiar = response;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.lotesSubscription && this.lotesSubscription.unsubscribe();
    this.vinculacionSubscription && this.vinculacionSubscription.unsubscribe();
  }

  onSelectionChange(marco: Marco): void {
    this.marco = marco;
  }

  async downloadQR(): Promise<void> {

    this.showSpinner = true;
    let zip = new JSZip();
    let img = zip.folder("images");

    let qr = document.getElementById(this.lote.id.toString());
    const canvas = <HTMLCanvasElement> qr?.firstChild;
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
      img!.file(this.lote.id+".png", data, {base64: true});
      zip.generateAsync({type:"blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(
        (content: any) => {
          saveAs(content, 'codigo.zip')
          this.showSpinner = false;
        }
      );
    })
    .catch((error) => {
      this.showBasicDialog('Error', 'Ocurrió un error al generar el archivo, intente nuevamente.')
      // console.log(error);
    })
  }
}
