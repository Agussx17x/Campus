import { Injectable } from '@angular/core';
// Servicio de Autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Referenciamos Auth de Firebase
  constructor(private afAuth: AngularFireAuth) { }

  // Metodo para registrarse
  registrar(email: string, password: string){
    // retorna nuevo valor de nombre y contrasena
    return this.afAuth.createUserWithEmailAndPassword(email,password);
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

  getAuthToken(): Observable<boolean>{
    return of(true)
  }
}