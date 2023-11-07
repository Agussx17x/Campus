import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Seccion } from 'src/app/models/seccion';
@Injectable({
  providedIn: 'root',
})
export class CrudService {

  seccionesCollection: AngularFirestoreCollection<Seccion>;

  constructor(private database: AngularFirestore) {
    this.seccionesCollection = database.collection('secciones');
  }

  crearSeccion(seccion:any) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.database.createId();
        seccion.idSeccion = id;
  
        const resultado = await this.seccionesCollection.doc(id).set(seccion);
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  crearMaterial(idSeccion:any, material:any) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.database.createId();
        material.idMaterial = id;
  
        const resultado = await this.seccionesCollection.doc(idSeccion).collection('materiales').doc(id).set(material);
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  obtenerSecciones() {
    return this.seccionesCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }
  
  obtenerMateriales(idSeccion:any) {
    return this.seccionesCollection.doc(idSeccion).collection('materiales')
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }
}
