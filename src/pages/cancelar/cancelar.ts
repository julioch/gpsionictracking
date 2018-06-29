import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-cancelar',
  templateUrl: 'cancelar.html'
})
export class CancelarPage {
  selectedItem: any;
  icons: string[];
  users: any[] = [];
  facturas: any;
  locales: string = "lista";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: ServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    //this.getUsersAndDocs();
  }

  ionViewDidLoad() {
    this.getUsersAndDocs()
  }

  getUsersAndDocs() {

    let loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loader.present();

    this.restProvider.getUsersDeuda().then(data => {
      Object.keys(data).forEach(key => {
        this.restProvider.getFactura(data[key].idusuario).then(datos => {
          this.users.push({
            nombre_comercial: data[key].nombre_comercial,
            direccion: data[key].direccion,
            facturas: datos
          });
        });
      });
      loader.dismiss();
    });
  }

  openNavDocumentoPage(item) {
    this.navCtrl.push(DocumentoPage, { item: item });
  }
}


@Component({
  templateUrl: 'documento.html',
})
export class DocumentoPage {
  item: any;

  constructor(public restProvider: ServiceProvider,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public params: NavParams) {
    this.item = params.data.item;
  }

  cancelarDoc(nrodoc){
    let loader = this.loadingCtrl.create({
      content: "Guardando..."
    });
    loader.present();
    this.restProvider.cancelarDoc(nrodoc).then((result) => {
      console.log(result);
      loader.dismiss();
      this.navCtrl.setRoot(CancelarPage);
    })
  }
}