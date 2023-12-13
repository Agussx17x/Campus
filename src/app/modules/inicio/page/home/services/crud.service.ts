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
    // Inicializa las colecciones de Firestore en el constructor.
    this.seccionesCollection = database.collection('secciones');
    this.materiaColletion = database.collection('materias');
  }
  // Esta función crea y agrega una nueva sección a una materia específica en Firebase Firestore.
  crearSeccion(idMateria: string, seccion: any) {
    // Devuelve una promesa que se resolverá o se rechazará después de intentar crear y agregar la sección.
    return new Promise(async (resolve, reject) => {
      try {
        // Genera un nuevo identificador único para la sección.
        const id = this.database.createId();
        // Asigna el nuevo identificador a la sección.
        seccion.idSeccion = id;
        // Agrega la sección a la colección 'secciones' dentro de la materia específica en Firestore.
        const resultado = await this.database
          .collection('materias')
          .doc(idMateria)
          .collection('secciones')
          .doc(id)
          .set(seccion);
        // Resuelve la promesa con el resultado de la operación.
        resolve(resultado);
      } catch (error) {
        // Rechaza la promesa si hay un error.
        reject(error);
      }
    });
  }
  // Esta función obtiene las secciones de una materia específica en Firebase Firestore.
  obtenerSecciones(idMateria: string) {
    // Devuelve un observable que emite un array de documentos (snapshotChanges) en la colección 'secciones' de la materia específica.
    return this.database
      .collection(`materias/${idMateria}/secciones`)
      .snapshotChanges();
  }
  // Esta función carga un archivo en Firebase Storage y devuelve la URL de descarga del archivo.
  uploadFile(file: File): Promise<string> {
    // Devuelve una nueva promesa que se resuelve o rechaza según el resultado de la operación de carga.
    return new Promise((resolve, reject) => {
      // Define la ruta del archivo en Firebase Storage utilizando el nombre del archivo.
      const filePath = `materiales/${file.name}`;
      // Obtiene una referencia al archivo en Firebase Storage.
      const fileRef = this.storage.ref(filePath);
      // Inicia la tarea de carga del archivo.
      const task = this.storage.upload(filePath, file);
      // Observa el progreso de la tarea de carga (snapshotChanges).
      task
        .snapshotChanges()
        .pipe(
          // finaliza la observación al completarse la tarea de carga.
          finalize(async () => {
            // Obtiene la URL de descarga del archivo después de que la tarea de carga se haya completado.
            const url = await fileRef.getDownloadURL().toPromise();
            console.log(`${file.name} subido correctamente`);
            console.log(`URL de descarga: ${url}`);
            // Resuelve la promesa con la URL de descarga del archivo.
            resolve(url);
          })
        )
        // Suscribe la observación.
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
  //Crear Materia
  crearMateria(data: Materia) {
    // Devuelve una nueva promesa que se resuelve o rechaza según el resultado de la operación en Firestore.
    return new Promise<any>((resolve, reject) => {
      // Genera un nuevo ID para la materia.
      const id = this.database.createId();
      // Asigna el nuevo ID a la propiedad 'idMateria' del objeto 'data'.
      data.idMateria = id;
      // Accede a la colección 'materias', luego al documento con el nuevo ID, y establece los datos de la materia.
      this.database
        .collection('materias')
        .doc(id)
        .set(data)
        .then(
          // La operación fue exitosa.
          (res) => {},
          // La operación falló.
          (err) => reject(err)
        );
    });
  }
  // Obtener Materia
  obtenerMaterias() {
    // Devuelve un objeto observable que emite un array de cambios en la colección 'materias'.
    return this.database.collection('materias').snapshotChanges();
  }
  editarMateria(idMateria: string, nuevaData: Materia) {
    return this.database
      .collection('materias')
      .doc(idMateria)
      .update(nuevaData);
  }
  eliminarMateria(idMateria: string) {
    return new Promise((resolve, reject) => {
      try {
        // Utiliza el método 'delete()' del documento correspondiente en la colección.
        const resp = this.materiaColletion.doc(idMateria).delete();
        // Resuelve la promesa con la respuesta de la operación.
        resolve(resp);
      } catch (error) {
        // Rechaza la promesa con el error en caso de cualquier problema.
        reject(error);
      }
    });
  }
  //Crear material
  crearMaterial(
    idMateria: string,
    idSeccion: string,
    material: any
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.database.createId();
        material.idMaterial = id;
        const resultado = await this.database
          .collection('materias')
          .doc(idMateria)
          .collection('secciones')
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
  // Esta función obtiene la lista de materiales asociados a una sección específica dentro de una materia en Firebase Firestore.
  obtenerMateriales(idMateria: string, idSeccion: string) {
    // Retorna una colección que contiene los cambios en la colección 'materiales' dentro de la sección específica en Firestore.
    return this.database
      .collection(`materias/${idMateria}/secciones/${idSeccion}/materiales`)
      .snapshotChanges();
  }
  // Esta función genera y devuelve un nuevo identificador único utilizando la función createId() de Firestore.
  crearId(): string {
    return this.database.createId();
  }
}
