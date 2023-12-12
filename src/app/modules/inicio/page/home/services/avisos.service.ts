import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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

  constructor(
    private database: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    // Inicializa la colección avisos.
    this.avisosCollection = database.collection('avisos');
  }

  // Este método crea un nuevo aviso.
  crearAvisos(id: string, avisos: Avisos) {
    return new Promise(async (resolve, reject) => {
      try {
        // Asigna el ID proporcionado al aviso.
        avisos.idAvisos = id;

        // Guarda el aviso en Firestore usando el ID proporcionado.
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
  eliminarAvisos(idAvisos: string, aviso: Avisos) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verifica si el aviso tiene una imagen.
        if (aviso.imagenUrl) {
          // Si el aviso tiene una imagen, elimínala.
          const filePath = `avisos/${idAvisos}`;
          await this.storage.ref(filePath).delete().toPromise();
        }

        // Elimina el aviso de Firestore Database.
        const resp = await this.avisosCollection.doc(idAvisos).delete();
        resolve(resp);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Método para generar un nuevo ID.
  generarId(): string {
    // Utiliza el metodo "createId" para generar un nuevo ID.
    return this.database.createId();
  }

  // Método para subir una imágen a FireStorage.
  subirImagen(imagen: File, idAviso: string): Promise<string> {
    // Define la ruta del archivo en Firebase Storage.
    const filePath = `avisos/${idAviso}`;
    // Obtiene una referencia al archivo en Firebase Storage.
    const ref = this.storage.ref(filePath);
    console.log(`Subiendo imagen con ID: ${idAviso}`);
    // Sube la imagen a Firebase Storage y luego obtiene la URL de descarga de la imagen.
    return this.storage.upload(filePath, imagen).then(() => {
      return ref.getDownloadURL().toPromise();
    });
  }
}
