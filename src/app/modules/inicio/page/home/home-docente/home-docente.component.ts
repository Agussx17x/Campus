import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ListaUsuariosService } from '../services/lista-usuarios.service';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.component.html',
  styleUrls: ['./home-docente.component.css'],
})
export class HomeDocenteComponent {
  // Propiedades para almacenar el nombre y apellido del usuario.
  nombre: string = '';
  apellido: string = '';
  // Propiedad para almacenar el tipo de credencial del usuario.
  tipoCredencial: string = '';
  // Mapeo de credenciales abreviadas a formas completas.
  credencialesMapping: { [key: string]: string } = {
    adm: 'Administrador',
    doc: 'Docente',
    est: 'Estudiante',
  };

  constructor(
    private listaUsuariosService: ListaUsuariosService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    // Suscribe al estado de autenticación en AngularFire.
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Si hay un usuario autenticado, obtiene el UID del usuario.
        const uidUsuarioLogueado = user.uid;
        // Obtiene la lista de usuarios.
        this.listaUsuariosService.obtenerUsuarios().subscribe((usuarios) => {
          // Encuentra al usuario autenticado en la lista de usuarios.
          const usuarioLogueado = usuarios.find(
            (u) => u.uid === uidUsuarioLogueado
          );
          // Si se encuentra al usuario autenticado en la lista.
          if (usuarioLogueado) {
            // Asigna valores a las propiedades del componente.
            this.nombre = usuarioLogueado.nombre;
            this.apellido = usuarioLogueado.apellido;
            // Traduce la credencial abreviada.
            this.tipoCredencial =
              this.credencialesMapping[usuarioLogueado.credencial] ||
              'Usuario sin tipo';
          }
        });
      }
    });
  }
}
