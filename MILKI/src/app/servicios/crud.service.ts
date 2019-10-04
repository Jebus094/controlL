import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //CRUD NOVILLA
  constructor(private firestore: AngularFirestore) { }

  create_Newnovilla(record) {
    return this.firestore.collection('novilla').add(record);
  }
  read_novilla(uid) {
    return this.firestore.collection('novilla', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }
  update_novilla(recordID, record) {
    this.firestore.doc('novilla/' + recordID).update(record);
  }
  delete_novilla(record_id): Promise<void> {
    return this.firestore.doc('novilla/' + record_id).delete();
  }

  

  //CRUD LECHE
  create_Newleche(record) {
    return this.firestore.collection('pleche').add(record);
  }
  read_leche(uid) {
    return this.firestore.collection('pleche', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }
  update_leche(recordID, record) {
    this.firestore.doc('pleche/' + recordID).update(record);
  }
  delete_leche(record_id): Promise<void> {
    return this.firestore.doc('pleche/' + record_id).delete();
  }

  //CRUD VACA GESTANTE
  create_Newprosima(record) {
    return this.firestore.collection('prosima').add(record);
  }
  read_prosima(uid) {
    return this.firestore.collection('prosima', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }
  update_prosima(recordID, record) {
    this.firestore.doc('prosima/' + recordID).update(record);
  }
  delete_prosima(record_id): Promise<void> {
    return this.firestore.doc('prosima/' + record_id).delete();
  }

  //CRUD VACA 

  create_Newvaca(record) {
    return this.firestore.collection('vaca').add(record);
  }

  read_vaca(uid) {
    return this.firestore.collection('vaca', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }

  update_vaca(recordID, record) {
    this.firestore.doc('vaca/' + recordID).update(record);
  }

  delete_vaca(record_id): Promise<void> {
    return this.firestore.doc('vaca/' + record_id).delete();
  }
}
