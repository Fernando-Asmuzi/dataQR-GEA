import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  opened = true;
  id: String | null = '';
  user: String | null = '';
  opcion: Number = 0;

  fillerNav = [
    {name: "Home", opcion: 1, icon:"home"},
    {name: "Productos" , opcion: 2, icon: "qr_code_2"},
    {name: "Familiares" , opcion: 3, icon: "family_restroom"},
    {name: "Emergencia" , opcion: 4, icon: "emergency"},
  ]  
  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id)
      this.usuarioService.getUsuarioId(Number(this.id)).subscribe( response =>{
        if(response){
           this.user = response.display_name;
        }
     }); 
  }

  seleccion(sel: Number){
    this.opcion = sel;
    console.log(this.opcion)
    return this.opcion;
  }
 
}
