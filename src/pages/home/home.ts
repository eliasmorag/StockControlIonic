import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartProvider  } from '../../providers/cart/cart';
import { Cart } from '../../models/cart';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import { ToastController } from 'ionic-angular';
import { CartPage } from '../../pages/cart/cart';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  producto:any;
  cantidad=1;
  options:BarcodeScannerOptions;
  

  constructor(private barcode:BarcodeScanner, public navCtrl: NavController,private firebaseService:FirebaseProvider, 
    public navParams: NavParams, protected cartService:CartProvider,
    public toastCtrl: ToastController) {}

  async scanBarcode(){
    this.options={
      prompt:'Escanea un codigo de barras'
    }
    this.barcode.scan(this.options).then((results:BarcodeScanResult)=> {
      this.firebaseService.getProducto(results.text).subscribe(producto => {
        this.producto=producto;
      });
    })
  }

  addToCart(producto){
    this.cartService.addToCart({producto:this.producto,quantity: this.cantidad});
    let toast = this.toastCtrl.create({
      message: 'Item agregado al carrito!',
      duration: 1000,
      position:'bottom' 
    });

    toast.present(toast);
    this.producto=null;
    this.cantidad=1;
  }

  goToCart(){
      this.navCtrl.push(CartPage);
  }

}
