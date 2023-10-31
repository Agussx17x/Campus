import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Rutas
import { AuthService } from '../services/auth.service'; // Funcion Iniciar Sesion
import { Usuario } from 'src/app/models/usuario'; // Interfaz
import { FirestoreService } from 'src/app/shared/services/firestore.service'; // Nos Trae Datos
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  email!:string;
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
    public firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
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
        this.afAuth.authState.subscribe(user => {
          if (user) {
            // Usuario está logueado
            this.firestore.collection('usuarios').doc(user.uid).valueChanges().subscribe((data: any) => {
              // Aquí obtienes las credenciales del usuario
              const credentials = data.credencial;
              
              // Rediriges al usuario basado en sus credenciales
              if (credentials === 'est') {
                this.router.navigate(['/estudiante']);
              } else {
                if (credentials === 'doc') {
                  this.router.navigate(['/docente'])
                } else {
                  this.router.navigate(['/admin'])
                }
              }
            });
          } else {
            // Usuario no está logueado
            this.router.navigate(['/login']);
          }
        });
        //////// Fin Base de Datos /////////
      })
      .catch((error) => {
        console.error(error);
        //Usuario Invalido                          
      });
  }
  back() {
    this.router.navigate(['/inicio']);
  }
  //Funcion para CERRAR SESION
  async salir() {
    const res = await this.authService.logout().then((res) => {
      alert('ha cerrado sesión con éxito!');
      console.log(res);
      this.router.navigate(['/inicio']);
    });

  }
  resetPassword(): void {
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.email)
      .then(() => {
        // Correo electrónico de restablecimiento de contraseña enviado.
        // Aquí puedes mostrar un mensaje al usuario para informarle.
        alert('Se envio un correo para restablecer tu contraseña del campus!!');
        //Una vez que le das a aceptar a la alerta, se recarga la pagina haciendo que vuelvas a inicio sesion.
        location.reload()
      })
      .catch((error) => {
        // Ocurrió un error. Aquí puedes manejar el error.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Disculpa, este correo no esta registrado en el campus :(. si crees que esto es un error, te invitamos a escribir al correo de nuestra institución')
      });
  }
}
