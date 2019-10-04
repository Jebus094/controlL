import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CrudService } from './../../servicios/crud.service';
import {  Observable  } from 'rxjs';
import {  AlertController  } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { Storage } from '@ionic/storage'
import { DataService } from '../../servicios/data.service';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-vacac',
  templateUrl: './vacac.page.html',
  styleUrls: ['./vacac.page.scss'],
})
export class VacacPage implements OnInit {
  myDate = Date.now();
  todoCollection: AngularFirestoreCollection<VacacPage>
  ganaderia: Observable<VacacPage[]>
  vaca: any;
  nombre_vaca: string;
  numero_vaca: number;
  peso: number;
  estado: string;
  raza: String;
  FN: Date;
  cantidad_hijos: number;
  enfermedad: string;
  medicamento:string;
 

  constructor( private asf: AngularFirestore,
    private crudService: CrudService, 
    public alertCtrl: AlertController,  
    private router: Router,
    private storage: Storage,
    public dataService: DataService ) { }

    ionViewDidEnter(){
      this.todoCollection = this.asf.collection('novilla');
      this.ganaderia = this.todoCollection.valueChanges();
      console.log(this.ganaderia);
  
    }

  ngOnInit() {
    this.storage.get('uid').then((uid) => {
      this.crudService.read_vaca(uid).subscribe(data => {
        this.vaca = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            nombre_vaca: e.payload.doc.data()['nombre_vaca'],
            numero_vaca: e.payload.doc.data()['numero_vaca'],
            raza: e.payload.doc.data()['raza'],
            peso: e.payload.doc.data()['peso'],
            FN: e.payload.doc.data()['FN'],
            estado: e.payload.doc.data()['estado'],
            cantidad_hijos: e.payload.doc.data()['cantidad_hijos'],
            enfermedad: e.payload.doc.data()['enfermedad'],
            medicamento: e.payload.doc.data()['medicamento'],
    };
      })
      console.log(this.vaca);
    });
  });
  }

  async RemoveRecord(rowID) {
    const alert = await this.alertCtrl.create({
      message: 'Esta seguro de eliminar este registro?',
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
            this.crudService.delete_vaca(rowID).then(() => {
              this.router.navigateByUrl('vacac');
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
    record.Editpeso = record.peso;
    record.Editraza = record.raza;
    record.Editestado = record.etapa;
    record.Editcantidad_hijos = record.cantidad_hijos;
    record.Editenfermedad = record.enfermedad;
    record.Editmedicamento = record.medicamento;
  }
 
  UpdateRecord( recordRow ) {
    let record = {};
    record['nombre_vaca'] = recordRow.Editnombre_vaca;
    record['numero_vaca'] = recordRow.Editnumero_vaca;
    record['peso'] = recordRow.Editpeso;
    record['raza'] = recordRow.Editraza;
    record['estado'] = recordRow.Editestado;
    record['cantidad_hijos'] = recordRow.Editcantidad_hijos;
    record['enfermedad'] = recordRow.Editenfermedad;
    record['medicamento'] = recordRow.Editmedicamento;
    this.crudService.update_vaca(recordRow.id, record);
    recordRow.isEdit = false;
  }
  descargar(){
    var id= document.getElementById("results");
    var pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'landscape'
    });
    pdf.text("Informe de Vacas", 300, 50);
    pdf.setFont('veces');
    pdf.setFontType('cursiva');
    pdf.fromHTML(id, 70, 100);
    pdf.save("Vacas");
  }

   contar(){
    this.dataService.totalv = this.vaca.length;
    localStorage.setItem('totalv', JSON.stringify(this.vaca.length));
    this.router.navigate(['/inicio']);
  }
}

