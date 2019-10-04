import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage'; 
import { NovillacPage} from 'src/app/pages/novillac/novillac.page';
import { PipesModule } from './pipes/pipes.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(), 
    AppRoutingModule, 
    ComponentsModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule,  
    HttpClientModule, 
    PipesModule ],
  providers: [
    StatusBar, NovillacPage,
    AngularFirestore,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
