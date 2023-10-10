import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ListaUsuariosService } from '../../services/lista-usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent {
  coleccionUsuarios: Usuario[] = [];

  usuarioSeleccionado!: Usuario;

  usuario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    credencial: new FormControl('', Validators.required),
  });

  constructor(public listaService: ListaUsuariosService) {}

  // Obtenemos la coleccion de usuarios del servicio, la asignamos a usuario y lo guardamos en la coleccion de usuarios local.
  ngOnInit(): void {
    this.listaService.obtenerUsuarios().subscribe((usuario) => {
      this.coleccionUsuarios = usuario;
    });
  }

  // Función para mostrar modal de edición.
  mostrarEditar(usuarioSeleccionado: Usuario) {
    this.usuarioSeleccionado = usuarioSeleccionado;

    this.usuario.setValue({
      nombre: usuarioSeleccionado.nombre,
      apellido: usuarioSeleccionado.apellido,
      email: usuarioSeleccionado.email,
      password: usuarioSeleccionado.password,
      dni: usuarioSeleccionado.dni,
      credencial: usuarioSeleccionado.credencial,
    });
  }
  // Función para editar usuario.
  editarUsuario() {
    let datos: Usuario = {
      uid: this.usuarioSeleccionado.uid,
      nombre: this.usuario.value.nombre!,
      apellido: this.usuario.value.apellido!,
      email: this.usuario.value.email!,
      password: this.usuario.value.password!,
      dni: this.usuario.value.dni!,
      credencial: this.usuario.value.credencial!,
    };

    this.listaService
      .modificarUsuario(this.usuarioSeleccionado.uid, datos)
      .then((usuario) => {
        alert('Se edito el Usuario.');
      })
      .catch((error) => {
        alert('Hubo un error al modificar el usuario \n' + error);
      });
  }

  // Función para eliminar Usuario.
  borrarUsuario(usuarioSeleccionado: Usuario) {
    this.usuarioSeleccionado = usuarioSeleccionado;
    this.listaService
      .eliminarUsuario(this.usuarioSeleccionado.uid)
      .then((respuesta) => {
        alert('Se elimino el usuario.');
      })
      .catch((error) => {
        alert('No se pudo eliminar el usuario \n' + error);
      });
  }
}
