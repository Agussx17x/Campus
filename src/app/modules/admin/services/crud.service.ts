import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Trabajos } from 'src/app/models/trabajos';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private trabajoscollection: AngularFirestoreCollection<Trabajos>;

  constructor(private database: AngularFirestore) {
    this.trabajoscollection = database.collection('trabajos');
  }

  crearTrabajos(trabajos: Trabajos) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.database.createId();
        trabajos.idTrabajo = id;

        const resultado = await this.trabajoscollection.doc(id).set(trabajos);
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    });
  }
  obtenerTrabajos() {
    return this.trabajoscollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }

  editTrabajo(idTrabajo: string, newData: Trabajos) {
    return this.database.collection('trabajos').doc(idTrabajo).update(newData);
  }
  deleteTrabajo(idTrabajo: string) {
    return new Promise((resolve, reject) => {
      try {
        const res = this.trabajoscollection.doc(idTrabajo).delete();
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}
