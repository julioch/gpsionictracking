import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { EmpadronarPage, FotoPage, DatosPage } from '../pages/empadronar/empadronar';
import { CancelarPage, DocumentoPage } from '../pages/cancelar/cancelar';
import { SeguimientoPage } from '../pages/seguimiento/seguimiento';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service/service';

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';

import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    MyApp,
    EmpadronarPage,
    FotoPage,
    DatosPage,
    CancelarPage,
    DocumentoPage,
    SeguimientoPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EmpadronarPage,
    FotoPage,
    DatosPage,
    CancelarPage,
    DocumentoPage,
    SeguimientoPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera, FileTransfer,
    Geolocation,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider
  ]
})
export class AppModule {}
