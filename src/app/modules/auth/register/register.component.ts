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

  async registrarse() {
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

    //UID
    const uid = await this.serviceAuth.getuid(); // obteniendo uid

    this.usuarios.uid = uid; //Guardando el uid

    //Mostrando resultados
    console.log(res);
    //Guardar Usuario
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
}
