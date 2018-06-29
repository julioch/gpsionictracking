import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController, ToastController } from 'ionic-angular';

import { EmpadronarPage } from '../empadronar/empadronar';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    usuario: '',
    pass: ''
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: ServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loader = this.loadingCtrl.create({
      content: "Iniciando sesión..."
    });
    loader.present();
    this.restProvider.login(this.user).then((result) => {
      console.log(result)
      loader.dismiss();
      if ((<any>result).status === 'success'){
        if (Object.keys((<any>result).resultado).length > 0){
          localStorage.setItem('gpToken', JSON.stringify((<any>result).resultado));
          this.navCtrl.setRoot(EmpadronarPage);
          this.menuCtrl.enable(true);
        }
        else{
          this.presentToast('Debe ingresar un usuario y contraseña');
        }
      }
      else{
        this.presentToast('Usuario o contraseña incorrecta');
      }
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
