import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Rutas
import { AuthService } from '../services/auth.service'; // Funcion Iniciar Sesion
import { Usuario } from 'src/app/models/usuario'; // Interfaz
import { FirestoreService } from 'src/app/shared/services/firestore.service'; // Nos Trae Datos
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;

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

  // FormGroup del Login
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

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

  // Esta función te permite logearte
  async login() {
    // Obtenemos los valores de los campos de correo electrónico y contraseña.
    const email = this.loginForm.controls.email.value ?? '';
    const password = this.loginForm.controls.password.value ?? '';

    // Verificamos si el formulario es válido.
    if (this.loginForm.valid) {
      try {
        // Intentamos iniciar sesión con las credenciales proporcionadas.
        const res = await this.authService.login(email, password);

        // Si el inicio de sesión es exitoso, navegamos a la página correspondiente.
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.firestore
              .collection('usuarios')
              .doc(user.uid)
              .valueChanges()
              .subscribe((data: any) => {
                const credentials = data.credencial;
                if (credentials === 'est') {
                  this.router.navigate(['/estudiante']);
                } else {
                  if (credentials === 'doc') {
                    this.router.navigate(['/docente']);
                  } else {
                    this.router.navigate(['/admin']);
                  }
                }
              });
          } else {
            // Usuario no está logueado
            this.router.navigate(['/login']);
          }
        });
      } catch (error) {
        // Si ocurre un error durante el inicio de sesión, lo registramos en la consola.
        console.error(error);
      }
    } else {
      // Manejar el caso en el que el correo electrónico o contraseña no sea una cadena válida.
      alert(
        'Correo electrónico o contraseña incorrectos. Por favor, intenta de nuevo'
      );
    }
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
        location.reload();
      })
      .catch((error) => {
        // Ocurrió un error. Aquí puedes manejar el error.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(
          'Disculpa, este correo no esta registrado en el campus :(. si crees que esto es un error, te invitamos a escribir al correo de nuestra institución'
        );
      });
  }
}
