import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import "firebase/firestore";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent {
  email : string = '';
  password : string= '';
  errorMessage : string = '';

  hide = true;

  //Cambiar Active para modo Responsive
  //Agregamos la clase Active
  activeSignup() {
    let formBx = document.getElementById('formBx');
    let body = document.getElementById('body');

    formBx?.classList.add('active');
    body?.classList.add('active');
  }
  //Removemos la clase Active
  activeSignin() {
    let formBx = document.getElementById('formBx');
    let body = document.getElementById('body');

    formBx?.classList.remove('active');
    body?.classList.remove('active');
  }

  constructor( private authService: AuthService, private router: Router, private firestore: AngularFireModule){}

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        ////////Base de Datos/////////
        alert('Correo: VALID Contraseña: VALID');        
        ////////Fin Base de Datos/////////
      })
      .catch(error => {
        this.errorMessage = error.message;
        alert("Usuario Invalido");
      });
  }
  back(){
    window.history.back ();
  }
}
