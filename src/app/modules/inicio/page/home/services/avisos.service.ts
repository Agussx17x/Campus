import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { aV } from '@fullcalendar/core/internal-common';
import { map } from 'rxjs/operators';
import { Avisos } from 'src/app/models/avisos';

@Injectable({
  providedIn: 'root',
})
export class AvisosService {
  avisosCollection: AngularFirestoreCollection<Avisos>;

  constructor(private database: AngularFirestore) {
    this.avisosCollection = database.collection('avisos');
  }

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

  obtenerAvisos() {
    return this.avisosCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }
}
