import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required]);
  hide = true;
  password = '';
  user = '';

  constructor(private usuarioServicie: UsuarioService, private route: Router) { }

  ngOnInit(): void {
  }

  getErrorMessage() {

    if (this.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.email.hasError('email') ? 'Email no válido' : '';
  }

  ingresar(){
   
    this.usuarioServicie.getUsuario(this.email.value).subscribe( response =>{
       if(response){
          this.route.navigate(['/principal/'+ response.id]);
       }
    });
  }
}
