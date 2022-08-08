import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opened = false;

  constructor(private side: SidenavComponent) { }

  ngOnInit(): void {
  }

  abrir(){
    this.side.cambiar();
  }
}
