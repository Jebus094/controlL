import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { CrudService } from "../../servicios/crud.service";
import { MenuController } from '@ionic/angular';
import { Componente } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage'
import { NovillacPage  } from 'src/app/pages/novillac/novillac.page'
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  info: any;
  email: string;
  password: string;
  name: string;
  nombre_vaca: string;
  nombre_novilla: string;
  nombre_gestante: string;
  tot:number;
 

  componentes: Componente[]  = []
  myDate = Date.now();
  constructor( public authservice : AuthService, 
                private menuCtrl: MenuController,
                private crudService: CrudService,
                public NovillacPage: NovillacPage,
                public dataService: DataService
                 ) { 
                   
                 }
  Onlogout(){
    this.authservice.logout();
    this.dataService.totaln = localStorage.getItem("total");
    this.dataService.totalvg = localStorage.getItem("totalvg");
    this.dataService.totalv = localStorage.getItem("totalv");
    this.dataService.totalm = localStorage.getItem("totalm");
    localStorage.clear();
  }
  ngOnInit() {
    this.dataService.totaln = localStorage.getItem("total");
    this.dataService.totalvg = localStorage.getItem("totalvg");
    this.dataService.totalv = localStorage.getItem("totalv");
    this.dataService.totalm = localStorage.getItem("totalm");
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }


ocultar1: boolean     = false;
ocultar2: boolean     = false;
ocultar3: boolean     = false;
ocultar4: boolean     = false;
ocultartodos: boolean = false;

  accion1() {
    this.ocultar1 = !this.ocultar1;
    this.checkActiveButton();
  }
  
  accion2() {
    this.ocultar2 = !this.ocultar2;
    this.checkActiveButton();
  }
  
  accion3() {
    this.ocultar3 = !this.ocultar3;
    this.checkActiveButton();
  }
  
  accion4() {
    this.ocultar4 = !this.ocultar4;
    this.checkActiveButton();
  }
  
  checkActiveButton() {
    
    if ( this.ocultar1 && this.ocultar2 && this.ocultar3 && this.ocultar4 ) {
      
      this.ocultartodos = true;
    }
    else if ( !this.ocultar1 && !this.ocultar2 && !this.ocultar3 && !this.ocultar4 ) {
      
      this.ocultartodos = false;
    }
  }
  
  acciontodos() { 

    if ( this.ocultartodos === false ) {
      
      this.ocultar1     = true;
      this.ocultar2     = true;
      this.ocultar3     = true;
      this.ocultar4     = true;
    }
    else {
      
      this.ocultar1     = false;
      this.ocultar2     = false;
      this.ocultar3     = false;
      this.ocultar4     = false;
    }
    
    this.ocultartodos = !this.ocultartodos;
  }

}
