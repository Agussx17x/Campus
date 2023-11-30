import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Rutas
import { AuthService } from '../services/auth.service'; // Funcion Iniciar Sesion
import { Usuario } from 'src/app/models/usuario'; // Interfaz
import { FirestoreService } from 'src/app/shared/services/firestore.service'; // Nos Trae Datos
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getAuth,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
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

  // Variable para controlar si se muestra el mensaje de advertencia.
  emailDoesNotExist: boolean = false;
  wrongPassword: boolean = false;
  passwordVisible = false;

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
    // Obtenemos la instancia de autenticación de Firebase.
    const auth = getAuth();
    // Obtenemos el correo electrónico y la contraseña del formulario.
    const email = this.loginForm.controls.email.value ?? '';
    const password = this.loginForm.controls.password.value ?? '';

    // Verificamos si el formulario es válido.
    if (this.loginForm.valid) {
      try {
        // Intentamos iniciar sesión con las credenciales proporcionadas.
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

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
            // Si el usuario no está logueado, navegamos a la página de inicio de sesión.
            this.router.navigate(['/login']);
          }
        });
      } catch (error) {
        // Si ocurre un error durante el inicio de sesión, lo manejamos aquí.
        const errorCode = (error as any).code;
        if (errorCode === 'auth/user-not-found') {
          // El correo electrónico no está registrado
          this.emailDoesNotExist = true;
        } else if (errorCode === 'auth/wrong-password') {
          // La contraseña es incorrecta
          this.wrongPassword = true;
        }
      }
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

  // Esta función permite cambiar tu contraseña.
  async resetPassword(): Promise<void> {
    // Obtenemos la instancia de autenticación de Firebase.
    const auth = getAuth();
    try {
      // Intentamos obtener los métodos de inicio de sesión para el correo electrónico ingresado.
      const signInMethods = await fetchSignInMethodsForEmail(auth, this.email);
      // Si la lista de métodos de inicio de sesión no está vacía, significa que el correo electrónico está registrado.
      if (signInMethods.length > 0) {
        // El correo electrónico está registrado, enviamos el correo de restablecimiento.
        try {
          // Intentamos enviar el correo de restablecimiento de contraseña.
          await sendPasswordResetEmail(auth, this.email);
          alert(
            'Se envio un correo para restablecer tu contraseña del campus!!'
          );
          location.reload();
        } catch (error) {
          alert(
            'Hubo un error al intentar enviar el correo de restablecimiento.'
          );
        }
      } else {
        // El correo electrónico no está registrado, mostramos el mensaje de advertencia
        this.emailDoesNotExist = true;
      }
    } catch (error) {
      alert('Hubo un error al verificar el correo electrónico.');
    }
  }
}
