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

  // Variable de verificación para determinar si un administrador está logeado
  adminLogeado: boolean = false;

  // Interfaz para representar la estructura de un usuario
  usuarios: Usuario = {
    uid: '',
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    dni: '',
    credencial: '',
  };

  // Objeto para guardar las credenciales del usuario actual
  credenciales = {
    email1: '',
    password1: '',
  };

  hide = true;

  // FormGroup para el formulario de inicio de sesión

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  // Variables de control para mensajes de advertencia

  emailDoesNotExist: boolean = false;
  wrongPassword: boolean = false;
  passwordVisible = false;

  /////////////////////////// No Borrar /////////////////////////////////////
  //Cambiar Active para modo Responsive
  //Agregamos la clase Active
  // Funciones para cambiar la clase 'active' en el formulario (no borrar)
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
  // Función para el proceso de inicio de sesión
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
            // Si el usuario está autenticado, obtenemos sus datos desde Firestore.
            this.firestore
              .collection('usuarios')
              .doc(user.uid)
              .valueChanges()
              .subscribe((data: any) => {
                const credentials = data.credencial;
                if (credentials === 'est') {
                  // Si el usuario tiene credenciales de estudiante y no hay un admin logeado, navegamos a la página de estudiante.
                  // SI un admin se encuentra logeado no se volveran a ejecutar los navigate
                  if (this.adminLogeado == false) {
                    this.router.navigate(['/estudiante']);
                  }
                } else {
                  if (credentials === 'doc') {
                    // SI un admin se encuentra logeado no se volveran a ejecutar los navigate
                    if (this.adminLogeado == false) {
                      this.router.navigate(['/docente']);
                    }
                  } else {
                    // SI un admin se encuentra logeado no se volveran a ejecutar los navigate
                    if (this.adminLogeado == false) {
                      this.router.navigate(['/admin']);
                      // Guardamos las credenciales de ladministrador actual
                      this.credenciales = {
                        email1: email,
                        password1: password,
                      };
                      console.log(this.credenciales);
                      // Enviamos las credenciales del usuario actual
                      this.authService.getCredenciales(
                        this.credenciales.email1,
                        this.credenciales.password1
                      );
                      // Cambiamos la variable de verificación para indicar que un admin está logeado.
                      this.adminLogeado = true;
                      console.log(this.adminLogeado);
                    }
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
  // Función para retroceder a la página de inicio
  back() {
    this.router.navigate(['/inicio']);
  }

  //Funcion para CERRAR SESION
  // Función para cerrar sesión
  async salir() {
    // Llamada al método de cierre de sesión proporcionado por el servicio AuthService.
    const res = await this.authService.logout().then((res) => {
      // Muestra un mensaje de alerta indicando que la sesión se cerró con éxito.
      alert('ha cerrado sesión con éxito!');
      // Imprime el resultado (puede ser útil para propósitos de depuración).
      console.log(res);
      // Navega a la página de inicio después de cerrar sesión.
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
  // Función que se ejecuta al inicializar el componente
  ngOnInit() {
    // Cambiamos la verificación cada vez que se inicie el componente login
    this.adminLogeado = false;

    console.log(this.adminLogeado);
  }
}
