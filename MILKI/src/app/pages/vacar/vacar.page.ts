import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../servicios/crud.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage'


@Component({
  selector: 'app-vacar',
  templateUrl: './vacar.page.html',
  styleUrls: ['./vacar.page.scss'],
})
export class VacarPage implements OnInit {
  vaca: any;
  nombre_vaca: string;
  numero_vaca: number;
  raza: String;
  peso: number;
  FN: Date;
  estado: string;
  cantidad_hijos: number;
  enfermedad: string;
  medicamento: string;

  constructor(private crudService: CrudService,
    public navController: NavController,
    public alertCtrl: AlertController,
    private storage: Storage) { }

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
          }
        })
        console.log(this.vaca);
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
    record['cantidad_hijos'] = this.cantidad_hijos;
    record['enfermedad'] = this.enfermedad;
    record['medicamento'] = this.medicamento;

    this.storage.get('uid').then((val) => {
      record['uid'] = val;
      this.crudService.create_Newvaca(record).then(resp => {
        this.nombre_vaca = "";
        this.numero_vaca = null;
        this.peso = 0;
        this.raza = "";
        this.estado = "";
        this.FN;
        this.cantidad_hijos = 0;
        this.enfermedad="";
        this.medicamento="";
        console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
    });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_vaca(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.Editnombre_vaca = record.nombre_vaca;
    record.Editnumero_vaca = record.numero_vaca;
    record.Editpeso = record.peso;
    record.editraza = record.raza;
    record.estado = record.estado;
    record.idpadre = record.idpadre;
    record.cantidad_hijos = record.cantidad_hijos;
    record.editenfermedad = record.enfermedad;
    record.editmedicamento = record.medicamento; 
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['nombre_vaca'] = recordRow.Editnombre_vaca;
    record['numero_vaca'] = recordRow.Editnumero_vaca;
    record['peso'] = recordRow.Editpeso;
    record['raza'] = recordRow.editraza;
    record['etapa'] = recordRow.editetapa;
    record['estado'] = recordRow.editestado;
    record['cantidad_hijos'] = recordRow.editcantidad_hijos;
    record['enfermedad'] = recordRow.editenfermedad;
    record['medicamento'] = recordRow.editmedicamento;
    this.crudService.update_vaca(recordRow.id, record);
    recordRow.isEdit = false;
  }

  

}



