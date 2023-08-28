import { Injectable } from '@angular/core';
// Servicio de Autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // referenciamos Auth de Firebase
  constructor(private afAuth: AngularFireAuth) { }

  registrar(nombre: string, password: string){
    // retorna nuevo valor de nombre y contrasena
    return this.afAuth.createUserWithEmailAndPassword(nombre,password);
  }

  // Metodo para Loguearse
  login(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }


  //Recolectar UID del usuario
  async getuid(){
    //Genera una Promesa, y const user para la captura
    const user = await this.afAuth.currentUser;

    //Condicion para devolver nulo, o el uid si es que lo tiene
    if (user == null) {
      return null;
    }else{
      //Devuelve uid del usuario
      return user.uid;    }
  }
}