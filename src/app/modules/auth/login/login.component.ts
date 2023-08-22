import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor( private authService: AuthService, private router: Router){

  }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        // Inicio de sesión exitoso, redirige a la página segura
        this.router.navigate(['/inicio']);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }
}
