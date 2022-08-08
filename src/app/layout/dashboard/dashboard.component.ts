import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidenavComponent } from '../sidenav/sidenav.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  opened = false;
  id: String | null = '';
  user: String | null = '';
 
  constructor(private router: Router, private route: ActivatedRoute, private side: SidenavComponent, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
  }

  abrir(){
    this.side.cambiar();
  }
}
