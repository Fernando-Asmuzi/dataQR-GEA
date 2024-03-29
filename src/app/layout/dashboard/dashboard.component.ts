import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavOption } from 'src/app/models/navOption';
import { emptyUsuario, Usuario } from 'src/app/models/usuario';
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

  usuario: Usuario = emptyUsuario();

  fillerNav: NavOption[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) { }
 
  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');

      this.usuarioService.getUsuarioId(Number(this.id)).subscribe( response =>{
        if(response){
          this.user = response.display_name;
          this.usuarioService.setUserLogin(response);
          this.usuario = this.usuarioService.getUserLogin();
          this.opened = this.usuario.admin;
          this.generateMenu();
        }
      }); 
  }

  seleccion(sel: Number){
    this.opcion = sel;
    // console.log(this.opcion)
    return this.opcion;
  }

  logout(): void {
    this.usuarioService.logOut();
    this.router.navigate(['']);
  }

  generateMenu(): void {
    this.fillerNav = [
      {name: "Productos" , path: 'productos', icon: "store", admin: false, vendedor: false},
      {name: "Usuarios" , path: 'familiares', icon: "family_restroom", admin: false, vendedor: false},
      // {name: "Mis Ventas", path: 'agenda', icon: 'calendar_today', admin: false, vendedor: true},
      // Admin area
      {name: "Home" , path: 'home-admin', icon: "home", admin: true, vendedor: false},
      {name: "Gestion Lotes QR" , path: 'lotes', icon: "qr_code_2", admin: true, vendedor: false},
      {name: "Gestion Marcos" , path: 'marcos', icon: "filter_frames", admin: true, vendedor: false},
      {name: "Gestion Categorías" , path: 'categorias', icon: "art_track", admin: true, vendedor: false},
      {name: "Gestion Productos" , path: 'abm-productos', icon: "shopping_basket", admin: true, vendedor: false},
      {name: "Gestion Diseño" , path: 'disenos', icon: "category", admin: true, vendedor: false},
      {name: "Gestion Usuarios" , path: 'usuarios', icon: "supervised_user_circle", admin: true, vendedor: false},
      {name: "Gestion Convenios" , path: 'convenios', icon: "folder_shared", admin: true, vendedor: false},
//      {name: "Agenda", path: 'agenda', icon: 'calendar_today', admin: true, vendedor: false},
//      {name: "Ventas", path: 'ventas', icon: 'shop', admin: true, vendedor: false},
    ];
  }
 
}
