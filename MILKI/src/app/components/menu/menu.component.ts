import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { Componente } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from "../../servicios/auth.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  componentes: Observable<Componente[]>;

  constructor(public authservice : AuthService,private dataService : DataService) {}

  ngOnInit() {
    this.componentes= this.dataService.getMenuOpt();
  }
  Onlogout(){
    this.authservice.logout();
    this.dataService.totaln = localStorage.getItem("total");
    this.dataService.totalvg = localStorage.getItem("totalvg");
    this.dataService.totalv = localStorage.getItem("totalv");
    this.dataService.totalm = localStorage.getItem("totalm");
    localStorage.clear();
  }
}
