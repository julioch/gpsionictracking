import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-empadronar',
  templateUrl: 'empadronar.html'
})
export class EmpadronarPage {

  constructor(public navCtrl: NavController) {

  }

  openNavFotoPage() {
    this.navCtrl.push(FotoPage);
  }

}

@Component({
  templateUrl: 'foto.html',
})

export class FotoPage {

  foto: string = "assets/imgs/logo.png";

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.getPicture();
  }

  openNavDatosPage() {
    this.navCtrl.push(DatosPage, {image : this.foto});
  }

  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 100
    }
    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
    })
    .catch(error => {
      console.log(error);
    });
  }
}

@Component({
  templateUrl: 'datos.html',
})

export class DatosPage {

  user = {
    nombrecom: '',
    ruc: '',
    direccion : '',
    tipoUsuario: '',
    foto: ''
  };
  image: any;

  optionsTipUsuarios = [
    { name: "USUARIO", value: "USUARIO" },
    { name: "CLUB", value : "CLUB" }
  ];

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private params: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public restProvider: ServiceProvider) {
    this.image = this.params.get('image');
  }

  upload(){

    let loader = this.loadingCtrl.create({
      content: "Grabando..."
    });
    loader.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'file' + this.makeid() + '.jpg',
      headers: {}
    }

    fileTransfer.upload(this.image, 'http://201.240.67.54:8080/Proyectos/gescobapi/public/api/upload', options1)
    //fileTransfer.upload(this.image, 'http://192.168.1.2:8080/Proyectos/gescobapi/public/api/upload', options1)
      .then((data) => {
        this.user.foto = 'file' + this.makeid() + '.jpg';
        // success
        // Grabar los datos
        this.restProvider.addUser(this.user).then((result) => {
            console.log(result);
            console.log("Uploaded Successfully");
            loader.dismiss();
            this.presentToast("Data guardada");
          }, (err) => {
            console.log('Error: ' + JSON.stringify(err));
          });
      }, (err) => {
        console.log("error : " + JSON.stringify(err));
        loader.dismiss();
        this.presentToast(err);
      });
  }

  makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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

  guardar(){
    alert(JSON.stringify(this.user));
  }
}

