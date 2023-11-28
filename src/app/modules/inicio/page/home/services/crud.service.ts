import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs/operators';
import { Materia } from 'src/app/models/materia';
import { Seccion } from 'src/app/models/seccion';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  materiaColletion: AngularFirestoreCollection<Materia>;
  seccionesCollection: AngularFirestoreCollection<Seccion>;
  

  constructor(
    private database: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.seccionesCollection = database.collection('secciones');
    this.materiaColletion = database.collection('materias');
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

  //Crear Materia admin
  crearMateria(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.database
        .collection('materias')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }
  obtenerMaterias() {
    return this.database.collection('materias').snapshotChanges();
  }

}
