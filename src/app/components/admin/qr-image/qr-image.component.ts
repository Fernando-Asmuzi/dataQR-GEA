import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Marco } from 'src/app/models/marco';

@Component({
  selector: 'app-qr-image',
  templateUrl: './qr-image.component.html',
  styleUrls: ['./qr-image.component.scss']
})
export class QrImageComponent implements OnInit, OnChanges {

  @Input() id!: any;
  @Input() qrdata!: any;
  @Input() width!: any;
  @Input() errorCorrectionLevel!: any;
  @Input() hasLogo!: boolean;
  @Input() marco!: Marco;

  public isologo!: string;
  public setMarco!: boolean;
  public urlMarco!: string;

  constructor() { }

  ngOnInit(): void {
    this.isologo = this.hasLogo ? './assets/images/isologo.png' : '';
    this.setMarco = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    if(changes['hasLogo']){
      this.isologo = changes['hasLogo'].currentValue ? './assets/images/isologo.png' : '';
    }
    if(changes['marco']){
      this.urlMarco = `url(${changes['marco'].currentValue?.imagen})`;
      this.setMarco = changes['marco'].currentValue?.id !== 0 ? true : false;
    }
  }

}
