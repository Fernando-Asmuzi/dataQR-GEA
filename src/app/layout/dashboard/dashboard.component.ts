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
    {name: "Home", path: '.', icon:"home"},
    {name: "Productos" , path: 'productos', icon: "qr_code_2"},
    {name: "Familiares" , path: 'familiares', icon: "family_restroom"},
    {name: "Emergencia" , path: 'emergencia', icon: "emergency"},
    {name: "Gestion Lotes QR" , path: 'lotes', icon: "emergency"},
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

  logout(): void {
    this.usuarioService.logOut();
    this.router.navigate(['']);
  }
 
}
