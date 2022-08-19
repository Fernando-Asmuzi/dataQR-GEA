import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { emptyUsuario, Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = new FormControl('', [Validators.required]);
  hide = true;
  password = '';
  user = '';
  usuario : Usuario = emptyUsuario();
  login = {
      username: '',
      password: '',
  }

  constructor(private usuarioServicie: UsuarioService, private route: Router) { }

  ngOnInit(): void {
  }


  ingresar(){
   
    
    /* this.usuario.user_login = this.username.value;
    this.usuario.user_pass = this.password; */

    this.login.username = this.username.value;
    this.login.password = this.password


    this.usuarioServicie.postUsuario(this.login).subscribe( response =>{
       if(response){
          this.usuarioServicie.setUserLogin(response);
          this.route.navigate(['/principal/'+ response.id]);
       }
    });
  }
}