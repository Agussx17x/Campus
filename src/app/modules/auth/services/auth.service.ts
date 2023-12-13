import { Injectable } from '@angular/core';
// Servicio de Autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private inactivityTimer: any;

  // Objeto para guardar las credenciales del usuario actual
  credenciales = {
    email: '',
    password: '',
  };

  // Referenciamos Auth de Firebase
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  //Temporizador de inactividad
  iniciarTemporizadorInactividad() {
    // Establece el tiempo de inactividad en 15 minutos
    const tiempoInactividad = 15 * 60 * 1000;

    // Limpia el temporizador de inactividad existente
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);

    // Inicia un nuevo temporizador de inactividad
    this.inactivityTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['/login']);
    }, tiempoInactividad);
  }

  // Metodo para registrarse
  registrar(email: string, password: string) {
    // retorna nuevo valor de nombre y contrasena
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Metodo login
  async login(email: string, password: string) {
    try {
      // Intentar iniciar sesión con el correo electrónico y la contraseña proporcionados
      await this.afAuth.signInWithEmailAndPassword(email, password);
      // Si el inicio de sesión es exitoso, puedes realizar acciones adicionales aquí, como redireccionar a otra página.
    } catch (error) {
      console.error(error);
    }
  }
  // Cerrar sesion
  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
  // Obtener token
  get token() {
    return this.afAuth.idToken;
  }

  //Recolectar UID del usuario
  async getuid() {
    //Genera una Promesa, y const user para la captura
    const user = await this.afAuth.currentUser;

    //Condicion para devolver nulo, o el uid si es que lo tiene
    if (user == null) {
      return null;
    } else {
      //Devuelve uid del usuario
      return user.uid;
    }
  }

  // Funcion para conseguir las credenciales del componente login y guardarlas en el servicio
  getCredenciales(email1: any, password1: any) {
    this.credenciales = {
      // Crear un objeto con las credenciales
      email: email1,
      password: password1,
    };
  }
  // Funcion para enviar las mismas credenciales al componente register
  enviarCredenciales() {
    return this.credenciales;
  }
}
