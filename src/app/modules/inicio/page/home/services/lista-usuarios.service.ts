import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListaUsuariosService {
  private usuariosColeccion: AngularFirestoreCollection<Usuario>;

  constructor(private database: AngularFirestore) {
    // Inicializa la propiedad usuariosColeccion con una referencia a la colección 'usuarios' en Firestore.
    this.usuariosColeccion = database.collection('usuarios');
  }

  // Función para mostrar un Usuario en la lista.
  obtenerUsuarios() {
    // snapshot -> Captura los cambios.
    // pipe -> Tubería por donde viajan esos nuevos datos.
    // map -> Recorre esos datos, los lee.
    return (
      this.usuariosColeccion
        // Devuelve un observable que emite eventos cada vez que hay cambios en la colección de usuarios.
        .snapshotChanges()
        // Utiliza el operador 'map' para transformar la acción de cambios en datos de usuario.
        .pipe(map((action) => action.map((a) => a.payload.doc.data())))
    );
  }

  // Modificar Usuario.
  modificarUsuario(uid: string, nuevaData: Usuario) {
    return this.database.collection('usuarios').doc(uid).update(nuevaData);
  }

  // Función para eliminar un Usuario.
  eliminarUsuario(uid: string) {
    return new Promise((resolve, reject) => {
      try {
        // Intenta eliminar el documento con el UID proporcionado de la colección de usuarios.
        const resp = this.usuariosColeccion.doc(uid).delete();
        resolve(resp);
      } catch (error) {
        // En caso de error, rechaza la promesa con el error correspondiente.
        reject(error);
      }
    });
  }
}
