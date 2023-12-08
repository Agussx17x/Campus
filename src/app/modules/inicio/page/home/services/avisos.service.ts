import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { aV } from '@fullcalendar/core/internal-common';
import { map } from 'rxjs/operators';
import { Avisos } from 'src/app/models/avisos';
import { BehaviorSubject } from 'rxjs'; // BehaviorSubject es como un observable que puede emitir varios eventos, cargando siempre el último.

@Injectable({
  providedIn: 'root',
})
export class AvisosService {
  // Declara la colección avisos.
  avisosCollection: AngularFirestoreCollection<Avisos>;

  // Lo que hace es almacenar el aviso seleccionado para ser usado como "notificación". El signo $ es para decir que es un Observable.
  public avisoSeleccionado$ = new BehaviorSubject<Avisos | null>(null);

  constructor(private database: AngularFirestore) {
    // Inicializa la colección avisos.
    this.avisosCollection = database.collection('avisos');
  }

  // Este método crea un nuevo aviso.
  crearAvisos(avisos: Avisos) {
    return new Promise(async (resolve, reject) => {
      try {
        // Toma el ID referenciando a la base de datos y crea un nuevo iD.
        const id = this.database.createId();
        avisos.idAvisos = id;

        // Guarda ese nuevo ID.
        const resultado = await this.avisosCollection.doc(id).set(avisos);
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Este método obtiene los avisos.
  obtenerAvisos() {
    return this.avisosCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }

  // Este método modifica un nuevo aviso.
  modificarAvisos(idAvisos: string, nuevaData: Avisos) {
    return this.database.collection('avisos').doc(idAvisos).update(nuevaData);
  }

  // Este método elimina un aviso.
  eliminarAvisos(idAvisos: string) {
    return new Promise((resolve, reject) => {
      try {
        const resp = this.avisosCollection.doc(idAvisos).delete();
        resolve(resp);
      } catch (error) {
        reject(error);
      }
    });
  }
}
