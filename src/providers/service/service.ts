import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: HttpClient) {
  }

  apiUrl = 'http://localhost:8080/Proyectos/gpocket/public/api/';
  //apiUrl = 'http://ip/public/api/';

  login(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'login', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'usuarios').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getUsersByAgent(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'usuariosXCobrador/' + id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'usuario', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
        .subscribe(res => {
          console.log('API Response : ', JSON.stringify(res));
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUsersDeuda() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'usuariosDeuda').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  cancelarDoc(nroDoc) {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + 'cancelarDoc/' + nroDoc, { headers: { 'Content-Type': 'application/json' } })
        .subscribe(res => {
          console.log('API Response : ', JSON.stringify(res));
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getFactura(idUsuario) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'facturas/' + idUsuario).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
