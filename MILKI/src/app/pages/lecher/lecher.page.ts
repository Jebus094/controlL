import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../servicios/crud.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

 
@Component({
  selector: 'app-lecher',
  templateUrl: './lecher.page.html',
  styleUrls: ['./lecher.page.scss'],
})
export class LecherPage implements OnInit {
 
  leche: any;
  nombre_vaca: string;
  numero_vaca: number;
  FO: Date;
  jornada1: number;
  jornada2: number = 0;
  encargado1: string;
  encargado2: string= 'Encargado';
 
  constructor(private crudService: CrudService,
    public navController: NavController,
    public alertCtrl: AlertController,
    private storage: Storage) { }
 
  ngOnInit() {
    this.storage.get('uid').then((uid) => {
    this.crudService.read_leche(uid).subscribe(data =>{

      this.leche= data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre_vaca: e.payload.doc.data()['nombre_vaca'],
          numero_vaca: e.payload.doc.data()['numero_vaca'],
          FO: e.payload.doc.data(),
          jornada1: e.payload.doc.data()['jornada1'],
          jornada2: e.payload.doc.data()['jornada2'],
          encargado1: e.payload.doc.data()['encargado1'],
          encargado2: e.payload.doc.data()['encargado2'],
        };
       });
       console.log(this.leche)
      });
    });
  
  }
 
  CreateRecord() {
    let record = {};
    record['nombre_vaca'] = this.nombre_vaca;
    record['numero_vaca'] = this.numero_vaca;
    record['FO'] = this.FO;
    record['jornada1'] = this.jornada1;
    record['jornada2'] = this.jornada2;
    record['encargado1'] = this.encargado1;
    record['encargado2'] = this.encargado2;

    this.storage.get('uid').then((val) => {
      record['uid'] = val;
      this.crudService.create_Newleche(record).then(resp => {
        this.nombre_vaca = "";
        this.numero_vaca = undefined;
        this.FO;
        this.jornada1 = 0;
        this.jornada2 = 0;
        this.encargado1 = "";
        this.encargado2 = "";
  
        console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
    });
  }
 
  RemoveRecord(rowID) {
    this.crudService.delete_leche(rowID);
  }
 
}
