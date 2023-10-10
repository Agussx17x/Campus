import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private _formBuilder: FormBuilder){}

  isChecked = true;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  alertFormValues() {
    alert(JSON.stringify(this.isChecked));
  }

}
