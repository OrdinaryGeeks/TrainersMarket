import { Component, OnInit } from '@angular/core';
import { ShoppingcartService } from '../shoppingcart.service';

import { NgbModule, ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Item } from '../product/product.component';

@Component({
  selector: 'app-shopping-cart-bar',
  templateUrl: './shopping-cart-bar.component.html',
  styleUrls: ['./shopping-cart-bar.component.css']
})
export class ShoppingCartBarComponent implements OnInit {

  p: number = 1;
  totalPrice: number = 0;
  Items: Item[] = [];

  constructor(private cartService: ShoppingcartService, private modalService: NgbModal) {


    this.totalPrice = cartService.getTotalPrice();
    this.Items = cartService.cartItems;
  }

  ngOnInit(): void {
  }
  close(message: string) {


    this.modalService.dismissAll();
  }


  closeResult: string = '';
  onClick(content: any) {
    

    open(content);
  }


  addToCart() {

    //this.cartService.addProduct(this.selectedItem);
  }

  subtractFromCart() {
   // this.cartService.subtractProduct(this.selectedItem);
  }

  open(content: any) {
  //  this.selectedItem = Item;

    this.Items = this.cartService.cartItems;
    this.totalPrice = this.cartService.totalPrice;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
