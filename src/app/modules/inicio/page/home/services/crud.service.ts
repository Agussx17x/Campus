import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs/operators';
import { Seccion } from 'src/app/models/seccion';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  seccionesCollection: AngularFirestoreCollection<Seccion>;

  constructor(
    private database: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.seccionesCollection = database.collection('secciones');
  }

  crearSeccion(seccion: any) {
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

  obtenerSecciones() {
    return this.seccionesCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }

  obtenerMateriales(idSeccion: any) {
    return this.seccionesCollection
      .doc(idSeccion)
      .collection('materiales')
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }

  crearMaterial(idSeccion: any, material: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.database.createId();
        material.idMaterial = id;

        const resultado = await this.seccionesCollection
          .doc(idSeccion)
          .collection('materiales')
          .doc(id)
          .set(material);
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    });
  }

  editarMaterial(idSeccion: any, idMateria: any, material: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const respuesta = this.seccionesCollection
          .doc(idSeccion)
          .collection('materiales')
          .doc(idMateria)
          .update(material);
        resolve(respuesta);
      } catch (error) {
        reject(error);
      }
    });
  }

  eliminarMaterial(idSeccion: any, idMateria: any, material: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const respuesta = this.seccionesCollection
          .doc(idSeccion)
          .collection('materiales')
          .doc(idMateria)
          .delete();
        resolve(respuesta);
      } catch (error) {
        reject(error);
      }
    });
  }

  //Subir Material
  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `materiales/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      // Observa el progreso de la subida
      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            // Subida completada
            const url = await fileRef.getDownloadURL().toPromise();
            console.log(`${file.name} subido correctamente`);
            console.log(`URL de descarga: ${url}`);
            resolve(url);
          })
        )
        .subscribe();
    });
  }

  async listFiles() {
    const ref = this.storage.ref('materiales');
    const res = await ref.listAll().toPromise();
    for (let item of res!.items) {
      const url = await item.getDownloadURL();
      console.log(`Nombre del archivo: ${item.name}`);
      console.log(`URL de descarga: ${url}`);
    }
  }
}
