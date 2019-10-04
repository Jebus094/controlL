import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public email: string;
  public password: string;
  public name: string;

  constructor(private auth: AuthService,
    private router: Router,
    public alertController: AlertController,
    public dataService: DataService) { }

  ngOnInit() {
    
    
  }
  async OnSubmitRegister() {
    await this.auth.register(this.email, this.password, this.name).then(auth => {
      this.presentAlert();
      console.log(auth)
    }).catch(err => this.presentAlertError(err))

  }
  async presentAlert() {
    this.dataService.name = this.name;
    localStorage.setItem('name', JSON.stringify(this.name));

    const alert = await this.alertController.create({
      header: 'Registro Completado',
      subHeader: this.name,
      message: 'Bienvenido a controlLechero',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['inicio'])
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertError(err) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Ha ocurrido un error',
      message: err.message,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });

    await alert.present();
  }
}
