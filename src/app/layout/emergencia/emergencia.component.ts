import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emergencia',
  templateUrl: './emergencia.component.html',
  styleUrls: ['./emergencia.component.scss']
})
export class EmergenciaComponent implements OnInit {
  codigo : number = 0 
  constructor() { }

  ngOnInit(): void {
  }

}
