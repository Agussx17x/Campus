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
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const uidUsuarioLogueado = user.uid;

        this.listaUsuariosService.obtenerUsuarios().subscribe((usuarios) => {
          const usuarioLogueado = usuarios.find(
            (u) => u.uid === uidUsuarioLogueado
          );

          if (usuarioLogueado) {
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
