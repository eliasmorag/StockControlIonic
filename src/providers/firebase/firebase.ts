import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Producto } from '../../models/producto';


@Injectable()
export class FirebaseProvider {
  productos:FirebaseListObservable<any[]>;
  producto:FirebaseObjectObservable<any[]>;

  constructor(public http: Http, private af:AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }
  getProductos(){
    this.productos = this.af.list('/productos/') as FirebaseListObservable<Producto[]>
    console.log(this.productos)
    console.log("arriba prod")
    return this.productos;
    
  }

  getProducto(id){
    this.producto = this.af.object('/productos/'+id) as FirebaseObjectObservable<Producto[]>
    return this.producto;
  }

}
