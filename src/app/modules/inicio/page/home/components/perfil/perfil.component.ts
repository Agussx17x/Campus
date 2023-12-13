import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  constructor(private _formBuilder: FormBuilder) {}

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
