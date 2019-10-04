import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../servicios/crud.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-prosimar',
  templateUrl: './prosimar.page.html',
  styleUrls: ['./prosimar.page.scss'],
})
export class ProsimarPage implements OnInit {
  prosima: any;
  nombre_vaca: string;
  numero_vaca: number;
  raza: String;
  peso: number;
  FN: Date;
  idtoro: string;
  cantidad_hijos: number;
  fecha_prenez: Date;
  fecha_parto: Date;
  estado: string;
  enfermedad: string;
  medicamento: string;


  constructor(private crudService: CrudService,
    public navController: NavController,
    public alertCtrl: AlertController,
    private storage: Storage) { }

  ngOnInit() {
    this.storage.get('uid').then((uid) => {
      this.crudService.read_prosima(uid).subscribe(data => {
        this.prosima = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            nombre_vaca: e.payload.doc.data()['nombre_vaca'],
            numero_vaca: e.payload.doc.data()['numero_vaca'],
            etapa: e.payload.doc.data()['etapa'],
            raza: e.payload.doc.data()['raza'],
            peso: e.payload.doc.data()['peso'],
            FN: e.payload.doc.data()['FN'],
            estado: e.payload.doc.data()['estado'],
            enfermedad: e.payload.doc.data()['enfermedad'],
            medicamento: e.payload.doc.data()['medicamento'],
            idtoro: e.payload.doc.data()['idtoro'],
            fecha_prenez: e.payload.doc.data()['fecha_prenez'],
            fecha_parto: e.payload.doc.data()['fecha_parto'],
            cantidad_hijos: e.payload.doc.data()['cantidad_hijos'],
          };
          })
          console.log(this.prosima);
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
  record['estado'] = this.estado;
  record['enfermedad'] = this.enfermedad;
  record['medicamento'] = this.medicamento;
  record['idtoro'] = this.idtoro;
  record['fecha_prenez'] = this.fecha_prenez;
  record['fecha_parto'] = this.fecha_parto;
  record['cantidad_hijos'] = this.cantidad_hijos;

  this.storage.get('uid').then((val) => {
    record['uid'] = val;
  this.crudService.create_Newprosima(record).then(resp => {
    this.nombre_vaca = "";
    this.numero_vaca = undefined;
    this.peso = 0;
    this.raza = "";
    this.estado = "";
    this.FN;
    this.enfermedad = "";
    this.medicamento = "";
    this.idtoro = "";
    this.cantidad_hijos = 0;
    this.fecha_prenez;
    this.fecha_parto;
    console.log(resp);
  })
    .catch(error => {
      console.log(error);
    });
  });
}

RemoveRecord(rowID) {
  this.crudService.delete_prosima(rowID);
}

EditRecord(record) {
  record.isEdit = true;
  record.Editnombre_vaca = record.nombre_vaca;
  record.Editnumero_vaca = record.numero_vaca;
  record.Editpeso = record.peso;
  record.editraza = record.raza;
  record.estado = record.estado;
  record.medicamento = record.medicamento;
  record.enfermedad = record.enfermedad;
  record.idtoro = record.idtoro;
  record.fecha_prenez = record.fecha_prenez;
  record.fecha_prenez = record.fecha_prenez;
  record.cantidad_hijos = record.cantidad_hijos;
}

UpdateRecord(recordRow) {
  let record = {};
  record['nombre_vaca'] = recordRow.Editnombre_vaca;
  record['numero_vaca'] = recordRow.Editnumero_vaca;
  record['peso'] = recordRow.Editpeso;
  record['raza'] = recordRow.editraza;
  record['estado'] = recordRow.editestado;
  record['medicamento'] = recordRow.editmedicamento;
  record['enfermedad'] = recordRow.editenfermedad;
  record['idtoro'] = recordRow.editidtoro;
  record['fecha_prenez'] = recordRow.editfecha_prenez;
  record['fecha_parto'] = recordRow.editfecha_parto;
  record['cantidad_hijos'] = recordRow.editcantidad_hijos;
  this.crudService.update_prosima(recordRow.id, record);
  recordRow.isEdit = false;
}
 
  
 
}

