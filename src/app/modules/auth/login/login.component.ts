import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Rutas
import { AuthService } from '../services/auth.service'; // Funcion Iniciar Sesion
import { Usuario } from 'src/app/models/usuario'; // Interfaz
import { FirestoreService } from 'src/app/shared/services/firestore.service'; // Nos Trae Datos

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Interfaz
  usuarios: Usuario = {
    uid: '',
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    dni: '',
    credencial: '',
  };

  hide = true;

  /////////////////////////// No Borrar /////////////////////////////////////
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
  /////////////////////////// Fin No Borrar /////////////////////////////////////

  constructor(
    private authService: AuthService,
    private router: Router,
    public firestore: FirestoreService
  ) {}

  // Funcion asincrona Login()
  async login() {
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password,
    };

    const res = await this.authService
      .login(credenciales.email, credenciales.password)
      .then((res) => {
        //////// Base de Datos /////////
        alert('Sos: ' + this.usuarios.credencial);

        if (credenciales.email == 'agussx17x@gmail.com') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/estudiante']);
        }

        //////// Fin Base de Datos /////////
      })
      .catch((error) => {
        console.error(error);
        //Usuario Invalido
        alert('Usuario Invalido');                                 
      });
  }
  back() {
    window.history.back();
  }
  //Funcion para CERRAR SESION
  async salir() {
    const res = await this.authService.logout().then((res) => {
      alert('ha cerrado sesión con éxito!');
      console.log(res);
      this.router.navigate(['/inicio']);
    });
  }
}
