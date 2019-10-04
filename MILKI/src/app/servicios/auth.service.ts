import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../componentes/login/login.page';
import { isRejected, reject } from 'q';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private storage: Storage, private db: AngularFirestore
    , public alertController: AlertController) { }

  login(email: string, password: string) {

    return new Promise((resolve, rejected) => {

      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        this.storage.set('uid', user.user.uid);
        resolve(user);
      }).catch(err => rejected(err));
    });


  }
  logout() {
    this.AFauth.auth.signOut();
  }
  register(email: string, password: string, name: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        this.db.collection('usuario').doc(res.user.uid).set({
          Nombre: name,
          Correo: email,
          uid: res.user.uid
        });
        this.storage.set('uid', res.user.uid);
        resolve(res);
      }).catch(err => {
        this.presentAlertError(err);
        reject(err);
      });
    });
  }

  async presentAlertError(err) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Ha ocurrido un error',
      message: err.message,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });

    await alert.present();
  }
}