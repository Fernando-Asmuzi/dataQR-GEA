import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-image',
  templateUrl: './qr-image.component.html',
  styleUrls: ['./qr-image.component.scss']
})
export class QrImageComponent implements OnInit {

  @Input() id!: any;
  @Input() qrdata!: any;
  @Input() width!: any;
  @Input() errorCorrectionLevel!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
