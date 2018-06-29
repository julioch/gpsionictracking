import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';

import { EmpadronarPage } from '../pages/empadronar/empadronar';
import { CancelarPage } from '../pages/cancelar/cancelar';
import { SeguimientoPage } from '../pages/seguimiento/seguimiento';
import { LoginPage } from '../pages/login/login';

import * as firebase from 'firebase';
import { Device } from '@ionic-native/device';

const config = {
  apiKey: 'r3b6NWDvSGdo3w1LOmWZtF82Ni4',
  authDomain: 'geotracker-e83ce.firebaseapp.com',
  databaseURL: 'https://geotracker-e83ce.firebaseio.com',
  projectId: 'geotracker-e83ce',
  storageBucket: 'geotracker-e83ce.appspot.com'
};

firebase.initializeApp(config);

@Component({
  selector: 'page-menu',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  activePage: any;
  tokenObject: any;

  pages: Array<{title: string, component: any, icon : string, color: string}>;
  ref = firebase.database().ref('geolocations/');

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    private geolocation: Geolocation,
    private device: Device,
    public alertCtrl: AlertController,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Empadronar', component: EmpadronarPage, icon: 'create', color: 'secondary' },
      { title: 'Cancelar factura', component: CancelarPage, icon: 'card', color: 'iconDoc' },
      { title: 'Seguimiento', component: SeguimientoPage, icon: 'eye', color: 'iconSeg' }
    ];

    if (localStorage.getItem("gpToken") !== null) {
      this.rootPage = EmpadronarPage;
      this.tokenObject = localStorage.getItem('gpToken');
      this.activePage = this.pages[0];
    }
    this.getPosition();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  salir(){
    let alertLogout = this.alertCtrl.create({
      title: 'Salir',
      subTitle: '¿Quiere cerrar su sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            localStorage.removeItem('gpToken');
            this.activePage = this.pages[0];
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    alertLogout.present();
  }

  activeMenu(page) {
    return page == this.activePage;
  }

  getPosition(){
    if (localStorage.getItem("gpToken") !== null){
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        console.log(data.coords.latitude + ' ' + data.coords.longitude);
        let agente = JSON.parse(this.tokenObject);
        let usuario = agente.nombre;
        this.updateGeolocation(this.device.uuid, data.coords.latitude, data.coords.longitude, usuario);
        // data.coords.longitude
      });
    }
  }

  updateGeolocation(uuid, lat, lng, usuario) {
    if (localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/' + localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude: lng,
        agente: usuario
      });
    } else {
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng,
        agente: usuario
      });
      localStorage.setItem('mykey', newData.key);
    }
  }

}