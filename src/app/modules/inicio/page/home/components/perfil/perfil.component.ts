import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaUsuariosService } from '../../services/lista-usuarios.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  tipoCredencial: string = '';
  // Mapeo de credenciales abreviadas a formas completas.
  credencialesMapping: { [key: string]: string } = {
    adm: 'Administrador',
    doc: 'Docente',
    est: 'Estudiante',
  };


  constructor(private _formBuilder: FormBuilder,
    private listaUsuariosService: ListaUsuariosService,
    private afAuth: AngularFireAuth) {}

  async ngOnInit() {
    // Muestra el nombre, apellido y credencial del usuario actual suscribiendose.
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Si el usuario se logea, obtiene el uid del usuario atenticado.
        const uidUsuarioLogueado = user.uid;

        // Luego, obtiene la lista de usuarios.
        this.listaUsuariosService.obtenerUsuarios().subscribe((usuarios) => {
          // Encuentra al usuario autenticado en la lista de usuarios.
          const usuarioLogueado = usuarios.find(
            (u) => u.uid === uidUsuarioLogueado
          );

          // Si el usuario autenticado se encuentra en la lista de usuarios
          if (usuarioLogueado) {
            // Almacena el nombre y apellido del usuario.
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

  isChecked = true;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  alertFormValues() {
    alert(JSON.stringify(this.isChecked));
  }

  // Funcion para activar la edicion del nombre de usuario en el perfil.
  editarUsuario() {
    let inpUsuario = document.getElementById('inputUsuario');
    let aplUsuario = document.getElementById('btnAplicarUsuario');
    let canUsuario = document.getElementById('btnCancelarUsuario');
    let ediUsuario = document.getElementById('btnEditarUsuario');

    inpUsuario?.toggleAttribute('disabled');
    aplUsuario?.toggleAttribute('disabled');
    canUsuario?.toggleAttribute('disabled');
    ediUsuario?.toggleAttribute('disabled');
  }

  // Funcion para activar la edicion del nombre personal en el perfil.
  editarNombre() {
    let inpNombre = document.getElementById('inputNombre');
    let aplNombre = document.getElementById('btnAplicarNombre');
    let canNombre = document.getElementById('btnCancelarNombre');
    let ediNombre = document.getElementById('btnEditarNombre');

    inpNombre?.toggleAttribute('disabled');
    aplNombre?.toggleAttribute('disabled');
    canNombre?.toggleAttribute('disabled');
    ediNombre?.toggleAttribute('disabled');
  }

  // Funcion para activar la edicion del apellido en el perfil.
  editarApellido() {
    let inpApellido = document.getElementById('inputApellido');
    let aplApellido = document.getElementById('btnAplicarApellido');
    let canApellido = document.getElementById('btnCancelarApellido');
    let ediApellido = document.getElementById('btnEditarApellido');

    inpApellido?.toggleAttribute('disabled');
    aplApellido?.toggleAttribute('disabled');
    canApellido?.toggleAttribute('disabled');
    ediApellido?.toggleAttribute('disabled');
  }
}
