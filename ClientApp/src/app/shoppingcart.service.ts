import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './product/product.component';


@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {
 
  searchResult: number = 0;
  cartItems: Item[] = [];
  totalPrice: number = 0;
  zeroBalance: number = 0;
  constructor() {    
    
  }

  addProduct(item:Item) {
    var increase : number = 1;
    this.searchResult = this.cartItems.indexOf(item);
    if (this.searchResult != -1) {
      this.cartItems[this.searchResult].quantity += increase;
     
    }
    else {
      this.cartItems.push(item);
     
    }
    
    this.zeroBalance = 0;
    this.totalPrice = this.cartItems.reduce(
      (accumVariable : number, curValue) => accumVariable + curValue.cost * curValue.quantity
      , this.zeroBalance
    )
  }
  subtractProduct(item: Item) {

    var decrease: number = 1;
    this.searchResult = this.cartItems.indexOf(item);
    if (this.searchResult != -1) {
      this.cartItems[this.searchResult].quantity -= decrease;
      if (this.cartItems[this.searchResult].quantity <= 0)
        delete this.cartItems[this.searchResult];
    }
    this.zeroBalance  = 0;
    this.totalPrice = this.cartItems.reduce(
      (accumVariable: number, curValue) => accumVariable + curValue.cost * curValue.quantity
      , this.zeroBalance
    )
  }


   getTotalPrice() {
    return this.totalPrice;
  }

}
