import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  data: any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getData('top-headlines?country=co').subscribe(data =>{
console.log(data);
this.data= data;

    })
  }

}
