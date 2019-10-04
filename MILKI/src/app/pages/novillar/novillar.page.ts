import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../servicios/crud.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'app-novillar',
  templateUrl: './novillar.page.html',
  styleUrls: ['./novillar.page.scss'],
})
export class NovillarPage implements OnInit {
  myDate = Date.now();
  novilla: any;
  nombre_vaca: string;
  numero_vaca: number;
  raza: String;
  peso: number;
  FN: Date;
  idpadre: string;
  idmadre: string;
  enfermedad: string;
  medicamento: string ;
  estado: string;


  constructor(private crudService: CrudService,
    public navController: NavController,
    public alertCtrl: AlertController,
    private storage: Storage,
    ) {
      
  }

  ngOnInit() {
    this.storage.get('uid').then((uid) => {
      this.crudService.read_novilla(uid).subscribe(data => {
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
        console.log(this.novilla);

      });
    });
  }

  CreateRecord() {
    let record = {};
    record['nombre_vaca'] = this.nombre_vaca;
    record['numero_vaca'] = this.numero_vaca;
    record['peso'] = this.peso;
    record['raza'] = this.raza;
    record['FN'] = this.FN;
    record['idmadre'] = this.idmadre;
    record['idpadre'] = this.idpadre;
    record['enfermedad'] = this.enfermedad;
    record['medicamento'] = this.medicamento;
    record['estado'] = this.estado;

    this.storage.get('uid').then((val) => {
      record['uid'] = val;
      this.crudService.create_Newnovilla(record).then(resp => {
        this.nombre_vaca = null;
        this.numero_vaca = null;
        this.peso = 0;
        this.raza = "";
        this.idmadre = "";
        this.FN;
        this.idpadre = "";
        this.enfermedad = "";
        this.medicamento = "";
        this.estado="";
       
        console.log(resp);
      })
        .catch(error => {
          console.log(error);
        });
    });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_novilla(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.Editnombre_vaca = record.nombre_vaca;
    record.Editnumero_vaca = record.numero_vaca;
    record.Editpeso = record.peso;
    record.editraza = record.raza;
    record.idmadre = record.idmadre;
    record.idpadre = record.idpadre;
    record.Editmedicamento = record.medicamento;
    record.Editenfermedad = record.enfermedad;
    record.Editestado =  record.estado;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['nombre_vaca'] = recordRow.Editnombre_vaca;
    record['numero_vaca'] = recordRow.Editnumero_vaca;
    record['peso'] = recordRow.Editpeso;
    record['raza'] = recordRow.editraza;
    record['idpadre'] = recordRow.editidpadre;
    record['idmadre'] = recordRow.editidmadre;
    record['enfermedad'] = recordRow.editenfermedad;
    record['medicamento'] = recordRow.editmedicamento;
    record['estado'] = recordRow.editestado;
    this.crudService.update_novilla(recordRow.id, record);
    recordRow.isEdit = false;
  }

  calcular(){
    let ini = moment(this.FN);
    let fin = moment(this.myDate);
    let diff = fin.diff(ini, 'days');
    console.log(diff);
}
}

