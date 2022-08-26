import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { emptyUsuario, Usuario } from 'src/app/models/usuario';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  user = '';
  usuario : Usuario = emptyUsuario();
  form: FormGroup = this.fb.group({
    username:['', [Validators.required]],
    password:['', [Validators.required]]
  })

  constructor(private usuarioServicie: UsuarioService,
    private route: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 1500});
  }

  submitForm(){
    let registro = localStorage.getItem("registro") ? JSON.parse(localStorage.getItem("registro") || '') : null;

    this.usuarioServicie.postUsuario(this.form.value).subscribe( response =>{
       if(response){
         this.usuarioServicie.setUserLogin(response);
           if(registro){
              this.route.navigate(['/principal/'+ response.id + '/productos']);
           }else{
              this.route.navigate(['/principal/'+ response.id]);
           }         
       }
    },
    error => { this.openSnackBar('Datos incorrectos, intente nuevamente', 'Aceptar'); });
  }
}