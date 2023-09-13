import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor( firestore : AngularFirestoreCollection ) { }

  async getCredencial (){

  }
}
