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
  // Variable para almacenar el valor de búsqueda.
  buscarusers: string = '';

  // Colección de usuarios sin filtrar.
  coleccionUsuarios: Usuario[] = [];

  // Colección de usuarios filtrados.
  usuariosFiltrados: Usuario[] = [];

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
    this.listaService.obtenerUsuarios().subscribe((usuarios) => {
      this.coleccionUsuarios = usuarios; // Inicializamos la colección de usuarios sin filtrar.
      this.usuariosFiltrados = usuarios; // Inicializamos la colección de usuarios filtrados.
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
    const confirmacion = confirm('Desea borrar el usuario? '+ usuarioSeleccionado.dni);
    if (confirmacion) {
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

  // Función para filtrar usuarios basados en el valor de búsqueda.
  filtrarUsuarios() {
    const termino = this.buscarusers.toLowerCase(); // Toma el valor ingresado y lo convierte a minúsculas.
    // Aquí se filtran los usuarios de la colección completa.
    this.usuariosFiltrados = this.coleccionUsuarios.filter((usuario) => {
      return (
        usuario.dni.toLowerCase().includes(termino) || // Filtrar por dni
        usuario.nombre.toLowerCase().includes(termino) || // Filtra por nombre.
        usuario.credencial.toLowerCase().includes(termino) || // Filtra por credencial.
        usuario.uid.toLowerCase().includes(termino) // Filtra por ID.
      );
    });
  }
}
