import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
  hide = true;

  usuarios: Usuario = {
    uid: '',
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    dni:'',
    credencial:'',
  };

  uid = '';

  collectionUsers : Usuario [] = [];

  constructor(
    public serviceAuth: AuthService,
    public firestore: FirestoreService,
    public router : Router,
  ) {}

  async registrarse() {
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password,
    };
    const res = await this.serviceAuth
      .registrar(credenciales.email, credenciales.password)
      .then((res) => {
        alert('Ha agregado un nuevo usuario con exito');
        this.router.navigate(['/admin'])
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

  async ngOnInit(){
    const uid = await this.serviceAuth.getuid();
    console.log(uid);
  }

}
 