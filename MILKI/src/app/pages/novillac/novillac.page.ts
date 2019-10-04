import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CrudService } from './../../servicios/crud.service';
import { Observable, from } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataService } from '../../servicios/data.service';
import { Route } from '@angular/router';
import * as jsPDF from 'jspdf';
import { StringifyOptions } from 'querystring';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-novillac',
  templateUrl: './novillac.page.html',
  styleUrls: ['./novillac.page.scss'],
})
export class NovillacPage implements OnInit {
  myDate = Date.now();
  todoCollection: AngularFirestoreCollection<NovillacPage>
  ganaderia: Observable<NovillacPage[]>
  novilla: any;
  nombre_vaca: string;
  numero_vaca: number;
  raza: String;
  peso: number;
  FN: Date;
  idpadre: string;
  idmadre: string;
  total: number;
  enfermedad: string;
  medicamento: string;
  estado: string;
  textoBuscar='';

  constructor(private asf: AngularFirestore,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    public alertCtrl: AlertController,
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    public dataService: DataService,
    private db: AngularFirestore
  ) {
this.Inicializar();
  }
  ionViewDidEnter() {
    this.todoCollection = this.asf.collection('novilla');
    this.ganaderia = this.todoCollection.valueChanges();
    console.log(this.ganaderia);
  }

  ngOnInit() {   
    this.dataService.totalm = localStorage.getItem("total");
    this.dataService.name = localStorage.getItem("name");
    this.storage.get('uid').then((uid) => {
       this.crudService.read_novilla(uid).subscribe(data => {
        if (data) {
          this.novilla = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              nombre_vaca: e.payload.doc.data()['nombre_vaca'],
              numero_vaca: e.payload.doc.data()['numero_vaca'],
              raza: e.payload.doc.data()['raza'],
              peso: e.payload.doc.data()['peso'],
              FN: e.payload.doc.data()['FN'],
              idpadre: e.payload.doc.data()['idpadre'],
              idmadre: e.payload.doc.data()['idmadre'],
              enfermedad: e.payload.doc.data()['enfermedad'],
              medicamento: e.payload.doc.data()['medicamento'],
              estado: e.payload.doc.data()['estado'],
            };
          })

        } else {
          this.novilla = {};
        }



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
            this.crudService.delete_novilla(rowID).then(() => {
              this.router.navigateByUrl('novillac');
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
    record.Editidmadre = record.idmadre;
    record.Editidpadre = record.idpadre;
    record.Editenfermedad = record.enfermedad;
    record.Editmedicamento = record.medicamento;
    record.Editestado = record.estado;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['nombre_vaca'] = recordRow.Editnombre_vaca;
    record['numero_vaca'] = recordRow.Editnumero_vaca;
    record['peso'] = recordRow.Editpeso;
    record['raza'] = recordRow.Editraza;
    record['idpadre'] = recordRow.Editidpadre;
    record['idmadre'] = recordRow.Editidmadre;
    record['enfermedad'] = recordRow.Editenfermedad;
    record['medicamento'] = recordRow.Editmedicamento;
    record['estado'] = recordRow.Editestado;
    this.crudService.update_novilla(recordRow.id, record);
    recordRow.isEdit = false;
  }

  contar() {
    this.dataService.totaln = this.novilla.length;
    localStorage.setItem('total', JSON.stringify(this.novilla.length));
    this.router.navigate(['/novillac']);
  }



  descargar() {
    var id = document.getElementById("results");
    var pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'landscape'
    });
    pdf.text("Informe de Novillas", 300, 50);
    pdf.setFont('veces');
    pdf.setFontType('cursiva');
    pdf.fromHTML(id, 70, 100);
    pdf.save("Novillas");
  }

//searchBar 
Inicializar(){
  this.novilla;
}

getItems(ev: any){
  this.Inicializar();
  let val = ev.target.value;

  if (val && val.trim() !=''){
    this.novilla = this.novilla.filter((novilla) =>{
    return (novilla.nombre_vaca.indexOf(val.toLowerCase())> -1);
  });
  }else{
    

  }
  }



}


