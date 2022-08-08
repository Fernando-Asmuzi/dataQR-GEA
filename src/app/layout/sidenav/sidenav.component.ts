import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  id: String | null = '';
  opened = false;
fillerNav = [
    {name: "Home", route: "", icon:"home"},
    {name: "Mis Productos" , route: "/producto", icon: "qr_code_2"},
    {name: "Familiares" , route: "/familiares/"+this.id, icon: "family_restroom"},
    {name: "Emergencia" , route: "/emergencia", icon: "emergency"},
  ] 
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  
  cambiar(){
    this.opened = !this.opened;
    return this.opened;
  }

}
