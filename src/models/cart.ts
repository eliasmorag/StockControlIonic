import { Producto } from "./producto";

export interface Cart {
    producto:Producto;
    quantity:number;
}