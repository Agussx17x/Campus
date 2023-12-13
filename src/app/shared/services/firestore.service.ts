import { Injectable } from '@angular/core';
//Importamos angular firestore y la colleccion de datos
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
//importamos interface de usuarios
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private usuariosCollection: AngularFirestoreCollection<Usuario>;

  //Referenciamos a la coleccion de la DB
  constructor(private database: AngularFirestore) {
    this.usuariosCollection = this.database.collection<Usuario>('usuarios');
  }
  agregarUsuario(usuario: Usuario, id: string) {
    return new Promise(async (resolve, reject) => {
      //Resolve = Promesa Resuelta = then. Reject = Promesa Rechazada = catch

      try {
        // Asigna el ID proporcionado al campo 'uid' del objeto 'usuario'.
        usuario.uid = id;

        //Muestra Resultado sin Problema
        // Utiliza la referencia a la colección 'usuariosCollection' y el método 'set' para agregar el usuario a Firestore.
        const resultado = await this.usuariosCollection.doc(id).set(usuario);
        // Resuelve la promesa con el resultado de la operación.
        resolve(resultado);
      } catch (error) {
        //En caso de que ocurra un error
        reject(error);
      }
    });
  }
}
