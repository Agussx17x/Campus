import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs'; // Importamos un observable para manejar datos asincronicos y eventos.

@Injectable({  
  providedIn: 'root',
})
export class SeccionesService {
  private seccionesCollection: AngularFirestoreCollection<any>;

  constructor(private database: AngularFirestore) {
    this.seccionesCollection = database.collection('sección');
  }

  // Método para agregar una nueva sección.
  agregarSeccion(seccion: any) {
    return this.seccionesCollection.add(seccion);
  }

  // Método para obtener todas las secciones.
  /*obtenerSecciones(): Observable<any[]> {
    // Devuelve un Observable que representa los datos de todas las secciones en Firebase Firestore.
    return this.seccionesCollection.valueChanges();
  }*/
  obtenerSecciones() {
    return this.seccionesCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }
}
