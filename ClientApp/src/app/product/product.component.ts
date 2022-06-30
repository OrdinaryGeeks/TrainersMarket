import { Component, Injector, OnInit } from '@angular/core';

import { AuthorizeService, IUser } from '../../api-authorization/authorize.service';



import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NgbModule, ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingcartService } from '../shoppingcart.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {



  p: number = 1;
  itemName: string = '';
  isAdmin: boolean = false;
  cost: number = 0.0;
  imageUrl: string = '';
  description: string = '';
  quantity: number = 0;
  public Items: Item[] = [];
  modal1!: MyModal;
  hasItems: boolean = false;
  hasPages: boolean = false;
  adminView: boolean = false;
  shopperView: boolean = false;

  selectedItem: Item = { imageUrl: '', itemName: '', cost: 0, description: '', active: false, quantity: 0 }

  getNameOfUser: Observable<string | IUser | null | undefined>;
  nameOfUser: any;
  injector: Injector | undefined;

  constructor(private authorizeService: AuthorizeService, private modalService: NgbModal, private cartService: ShoppingcartService) {


    this.getNameOfUser = this.authorizeService.getUser().pipe(first());

    this.getNameOfUser.subscribe(noT => {
      if (typeof noT == "string")
        this.nameOfUser = noT;
      else if (noT == null || noT == undefined)
        this.nameOfUser = "Need to set this value"
      else
        this.nameOfUser = noT.name;

    });

    if (this.nameOfUser == 'alecto_perfecto@outlook.com') {
      this.isAdmin = true;
      this.adminView = true;
      this.shopperView = false;
    }
    else {
      this.isAdmin = false;
      this.shopperView = true;
      this.adminView = false;
    }

  }

  close(message: string) {


    this.modalService.dismissAll();
  }


  closeResult: string = '';
  onClick(content: any, Item: Item) {
    this.selectedItem = Item;

    open(content);
  }


  addToCart() {

    this.cartService.addProduct(this.selectedItem);
    var num = this.cartService.cartItems.indexOf(this.selectedItem);


    
    this.checkCartItems();
  }

  checkCartItems() {
    if (this.cartService.cartItems.length >= 1) {
      this.hasItems = true;
      this.checkProductPages();
    }
    else
      this.hasItems = false;
  }

  shopperScene() {
    this.shopperView = true;
    this.adminView = false;
  }
  adminScene() {
    this.adminView = true;
    this.shopperView = false;
  }

  checkProductPages() {
    if (this.cartService.cartItems.length >= 5)
      this.hasPages = true;
    else
      this.hasPages = false;
  }

  subtractFromCart() {
    this.cartService.subtractProduct(this.selectedItem);
    this.checkCartItems();
  }

  open(content: any, Item: Item) {
    this.selectedItem = Item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  src(content: any): string {


    return content.selectedItem.imageUrl;
  }


  //https://www.tutsmake.com/angular-13-bootstrap-modal-popup-example/
  onAddItem(): void {

    var iu: string = this.imageUrl;
    var ct: number = this.cost;
    var desc: string = this.description;
    var n: string = this.itemName;
    var q: number = this.quantity;
    var myItem: Item = {
      imageUrl: iu,
      cost: Number(ct),
      itemName: n,
      description: desc,
      active: false,
      quantity: Number(q)
    };

    this.Items.push(myItem);
    this.selectedItem = myItem;

    this.addToCart();
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
  ngOnInit(): void {
  }

}
export class MyModal {
  static result: any;
  constructor(private options: CustomModalOptions) {
    options.modalItem = { imageUrl: '', itemName:'', cost:0, description:'', active:false, quantity: 0 };
  }
}
class CustomModalOptions  {

  modalItem!: Item;
  

  constructor() {
    
  }
}
export interface Item {
  imageUrl: string;
  itemName: string;
  cost: number;
  description: string;
  active: boolean;
  quantity: number;

}
