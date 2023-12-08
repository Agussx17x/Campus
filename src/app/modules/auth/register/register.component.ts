import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;

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

    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password,
    };
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
    this.firestore
      .agregarUsuario(this.usuarios, this.usuarios.uid)

      .then((res) => {
        console.log(this.usuarios);
      })
      .catch((error) => {
        console.log('error => ', error);
      });
  }

  async ngOnInit() {
    const uid = await this.serviceAuth.getuid();
    console.log(uid);
  }

  validarEmail(email: string): boolean {
    const simbolos =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return simbolos.test(email);
  }
}
