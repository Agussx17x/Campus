import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hide = true;

  usuarios: Usuario = {
    uid: '',
    nombre: '',
    password: '',
  };

  constructor(public serviceAuth: AuthService) {}

  async registrarse() {
    const credenciales = {
      nombre: this.usuarios.nombre,
      password: this.usuarios.password,
    };
    const res = await this.serviceAuth
      .registrar(credenciales.nombre, credenciales.password)
      .then((res) => {
        alert('Ha agregado un nuevo usuario con exito');
      })
      .catch((error) =>
        alert('Hubo un error al cargar el usuario :( \n' + error)
      );
    console.log(res);
  }

}
