import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-seguimiento',
  templateUrl: 'seguimiento.html',
})
export class SeguimientoPage {

  users: any;
  tokenObject: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeguimientoPage');
    this.getUsers();
  }

  getUsers(){
    let loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loader.present();
    this.tokenObject = localStorage.getItem('gpToken');
    let agente = JSON.parse(this.tokenObject);
    this.restProvider.getUsersByAgent(agente.idcobrador).then(data => {
      this.users = data;
      loader.dismiss();
    });
  }

}
