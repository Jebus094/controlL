import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CrudService } from './../../servicios/crud.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'
import { DataService } from '../../servicios/data.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-prosimac',
  templateUrl: './prosimac.page.html',
  styleUrls: ['./prosimac.page.scss'],
})
export class ProsimacPage implements OnInit {
  myDate = Date.now();
  todoCollection: AngularFirestoreCollection<ProsimacPage>
  ganaderia: Observable<ProsimacPage[]>


  prosima: any;
  nombre_vaca: string;
  numero_vaca: number;
  peso: number;
  raza: String;
  FN: Date; 
  estado: string;
  enfermedad: string;
  medicamento: string;
  idtoro: string;
  cantidad_hijos: number;
  fecha_prenez: Date;
  fecha_parto: Date;

  constructor(private asf: AngularFirestore,
    private crudService: CrudService,
    public alertCtrl: AlertController,
    private router: Router,
    private storage: Storage,
    public dataService: DataService) { }


    ionViewDidEnter(){
      this.todoCollection = this.asf.collection('prosima');
      this.ganaderia = this.todoCollection.valueChanges();
    }

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
    })
    this.dataService.totalm = localStorage.getItem("total");
    this.dataService.name = localStorage.getItem("name");
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
            this.crudService.delete_prosima(rowID).then(() => {
              this.router.navigateByUrl('prosimac');
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
    record.Editestado = record.estado;
    record.Editenfermedad = record.enfermedad;
    record.Editmedicamento = record.medicamento;
    record.Editidpadre = record.idpadre;
    record.Editidtoro = record.idtoro;
    record.Editfecha_prenez = record.fecha_prenez;
    record.Editfecha_parto = record.fecha_parto;
    record.Editcantidad_hijos = record.cantidad_hijos;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['nombre_vaca'] = recordRow.Editnombre_vaca;
    record['numero_vaca'] = recordRow.Editnumero_vaca;
    record['peso'] = recordRow.Editpeso;
    record['raza'] = recordRow.Editraza;
    record['estado'] = recordRow.Editestado;
    record['enfermedad'] = recordRow.Editenfermedad;
    record['medicamento'] = recordRow.Editmedicamento;
    record['idtoro'] = recordRow.Editidtoro;
    record['fecha_prenez'] = recordRow.Editfecha_prenez;
    record['fecha_parto'] = recordRow.Editfecha_parto;
    record['cantidad_hijos'] = recordRow.Editcantidad_hijos;
    this.crudService.update_prosima(recordRow.id, record);
    recordRow.isEdit = false;
  }

 contar(){
    this.dataService.totalvg = this.prosima.length;
    localStorage.setItem('totalvg', JSON.stringify(this.prosima.length));
    this.router.navigate(['/prosimac']);
  }

  descargar(){
    var id= document.getElementById("results");
    //var logo = new Image();
    //logo.src = 'imagen.jpg'
    var pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'landscape'
    });
    pdf.text("Informe de Vacas Gestantes", 300, 50);
    pdf.setFontType('cursiva');
    pdf.fromHTML(id, 70, 100);
    pdf.save("Vacas Gestantes");
    //pdf.addImage(logo, 'JPEG', 15, 40, 148, 210)
  }
}


