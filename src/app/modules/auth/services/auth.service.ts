import { Injectable } from '@angular/core';
// Servicio de Autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // referenciamos Auth de Firebase
  constructor(public auth: AngularFireAuth) { }

  registrar(nombre: string, password: string){
    // retorna nuevo valor de nombre y contrasena
    return this.auth.createUserWithEmailAndPassword(nombre,password);
  }
}