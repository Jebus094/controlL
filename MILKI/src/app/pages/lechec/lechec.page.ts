import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from './../../servicios/crud.service'
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/servicios/data.service';
import * as jsPDF from 'jspdf';
import { Storage } from '@ionic/storage'


@Component({
  selector: 'app-lechec',
  templateUrl: './lechec.page.html',
  styleUrls: ['./lechec.page.scss'],
})
export class LechecPage implements OnInit {
  leche: any;
  nombre_vaca: string;
  numero_vaca: string;
  FO: Date;
  jornada1: number;
  jornada2: number;
  encargado1: string;
  encargado2: string;
  cantidad: number;
  total_leche: number;

  constructor(private crudService: CrudService,
    public alertCtrl: AlertController,
    private router: Router,
    private dataService: DataService,
    private storage: Storage,
    public firestore: AngularFirestore) { }
  2;

  ngOnInit() {
    this.storage.get('uid').then((uid) => {
      this.crudService.read_leche(uid).subscribe(data => {
        this.leche = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            nombre_vaca: e.payload.doc.data()['nombre_vaca'],
            numero_vaca: e.payload.doc.data()['numero_vaca'],
            FO: e.payload.doc.data()['FO'],
            jornada1: e.payload.doc.data()['jornada1'],
            jornada2: e.payload.doc.data()['jornada2'],
            encargado1: e.payload.doc.data()['encargado1'],
            encargado2: e.payload.doc.data()['encargado2'],
          };
        })
        console.log(this.leche);
      });
    });
}


async RemoveRecord(rowID) {
  const alert = await this.alertCtrl.create({
    message: '¿Esta seguro de eliminar este registro?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: blah => {
          console.log('Confirmar cancelación: blah');
        },
      },
      {
        text: 'Ok',
        handler: () => {
          this.crudService.delete_leche(rowID).then(() => {
            this.router.navigateByUrl('lechec');
          });
        },
      },
    ],
  });

  await alert.present();
}
EditRecord(record) {
  record.isEdit = true;
  record.Editnombre_vaca = record.nombre_vaca;
  record.Editnumero_vaca = record.numero_vaca;
  record.EditFO = record.FO;
  record.Editjornada1 = record.jornada1;
  record.Editjornada2 = record.jornada2;
  record.Editencargado1 = record.encargado1;
  record.Editencargado2 = record.encargado2;
}

UpdateRecord(recordRow) {
  let record = {};
  record['nombre_vaca'] = recordRow.Editnombre_vaca;
  record['numero_vaca'] = recordRow.Editnumero_vaca;
  record['FO'] = recordRow.EditFO;
  record['jornada1'] = recordRow.Editjornada1;
  record['jornada2'] = recordRow.Editjornada2;
  record['encargado1'] = recordRow.Editencargado1;
  record['encargado2'] = recordRow.Editencargado2;


  this.crudService.update_leche(recordRow.id, record);
  recordRow.isEdit = false;
}

buscar(event){
  console.log(event);
}

contar(){
  this.dataService.totalm = this.leche.length;
  localStorage.setItem('totalm', JSON.stringify(this.leche.length));
  this.router.navigate(['/inicio']);
}


}