import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ListaUsuariosService } from '../services/lista-usuarios.service';

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.component.html',
  styleUrls: ['./home-estudiante.component.css'],
})
export class HomeEstudianteComponent {
  nombre: string = '';
  apellido: string = '';

  // Almacena el tipo de credencial del usuario.
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
    // Se suscribe al observable authState de AngularFireAuth para monitorear el estado de autenticación del usuario.
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Cuando el usuario está conectado, se obtiene el usuario actual mediante uidUsuarioLogueado.
        const uidUsuarioLogueado = user.uid;

        // Se suscribe al observable obtenerUsuarios() de ListaUsuariosService para recuperar todos los usuarios.
        this.listaUsuariosService.obtenerUsuarios().subscribe((usuarios) => {
          // Se busca el usuario actual en la lista de usuarios recuperada.
          const usuarioLogueado = usuarios.find(
            (u) => u.uid === uidUsuarioLogueado
          );

          if (usuarioLogueado) {
            // Si se encuentra el usuario actual, se extraen su nombre, apellido y tipo de credencial de sus propiedades.
            this.nombre = usuarioLogueado.nombre;
            this.apellido = usuarioLogueado.apellido;
            // Se traduce la credencial abreviada a su forma completa utilizando el objeto credencialesMapping.
            this.tipoCredencial =
              this.credencialesMapping[usuarioLogueado.credencial] ||
              'Usuario sin tipo';
          }
        });
      }
    });
  }
}
