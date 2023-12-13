import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from '@angular/router';

// Importamos lo necesario para reiniciar sesion
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;

  // Variables para los datos del usuario actual
  auth: any;
  credenciales1: any;

  // Define un objeto de tipo Usuario.
  usuarios: Usuario = {
    uid: '',
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    dni: '',
    credencial: '',
  };

  uid = '';

  collectionUsers: Usuario[] = [];

  constructor(
    public serviceAuth: AuthService,
    public firestore: FirestoreService,
    public router: Router
  ) {}

  // Esta función registra a un Usuario.
  async registrarse() {
    // Verifica si los campos están completos.
    if (
      !this.usuarios.email ||
      !this.usuarios.password ||
      !this.usuarios.nombre ||
      !this.usuarios.apellido ||
      !this.usuarios.dni ||
      !this.usuarios.credencial
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Verifica si el correo es de tipo email.
    if (!this.validarEmail(this.usuarios.email)) {
      alert('Por favor, ingresé un dato tipo correo');
      return;
    }

    // Verifica si la contraseña tiene un un mínimo de 6 carácteres.
    if (this.usuarios.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Verifica si el DNI tiene es un valor de tipo número. IsNaN convierte el parametro a un numero, y devuelve true o false.
    if (isNaN(Number(this.usuarios.dni))) {
      alert('El DNI debe ser un número.');
      return;
    }

    // Crea las cedenciales del usuario.
    const credenciales = {
      // Obtener credenciales del formulario
      email: this.usuarios.email,
      password: this.usuarios.password,
    };
    // Llamar al servicio de autenticación para registrar al usuario
    const res = await this.serviceAuth
      .registrar(credenciales.email, credenciales.password)
      .then((res) => {
        alert('Ha agregado un nuevo usuario con exito');
      })
      .catch((error) =>
        alert('Hubo un error al cargar el usuario :( \n' + error)
      );

    // Obtiene el UID del usuario recién registrado.
    const uid = await this.serviceAuth.getuid();

    // Guarda el UID en el objeto usuarios.
    this.usuarios.uid = uid;

    //Mostrando resultados
    console.log(res);

    // Guarda el usuario en Firestore.
    this.guardarUser();
  }

  async guardarUser() {
    // Llamar al servicio Firestore para agregar el usuario
    this.firestore
      .agregarUsuario(this.usuarios, this.usuarios.uid)

      .then((res) => {
        console.log(this.usuarios);
        // Llamamos a la funcion para reiniciar sesion luego de registrar a un nuevo usuario
        this.reinicio();
      })
      .catch((error) => {
        console.log('error => ', error);
        // Llamamos a la funcion para reiniciar sesion luego de registrar a un nuevo usuario
        this.reinicio();
      });
  }

  // Funcion para reiniciar sesion luego de registrar a un nuevo usuario
  async reinicio() {
    // Utilizar las credenciales para iniciar sesión nuevamente
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      this.credenciales1.email,
      this.credenciales1.password
    );
  }

  async ngOnInit() {
    // Obtener el UID del usuario actual
    const uid = await this.serviceAuth.getuid();
    console.log(uid);
    // Conseguimos los datos para reiniciar la sesion
    this.auth = getAuth();
    // Obtener las credenciales del usuario para reiniciar sesión
    this.credenciales1 = await this.serviceAuth.enviarCredenciales();
    // Imprimir en la consola las credenciales del usuario (solo para propósitos de depuración)
    console.log(this.credenciales1.email, this.credenciales1.password);
  }

  // Esta función valida si el dato es de tipo correo.
  validarEmail(email: string): boolean {
    // Define una expresión regular para validar el formato de un correo electrónico.
    const simbolos =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Prueba si el correo electrónico cumple con el formato de la expresión regular.
    return simbolos.test(email);
  }
}
