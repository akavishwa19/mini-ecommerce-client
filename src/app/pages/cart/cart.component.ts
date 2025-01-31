import { Component } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  product_url:string=environment.baseurl+'/product';
  cart_url:string=environment.baseurl+'/cart';

  products:any=[];
  billAmount:number=0;

  constructor(private http:HttpClient,    private messageService: MessageService,){

  }

  ngOnInit(){
    this.fetchCart();
    this.fetchBill();
  }

  sucess(message) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
  error(message) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  fetchCart(){
    this.http.get(this.cart_url).subscribe((res:any)=>{
      this.products=res.data;
    })
  }

  addToCart(id:string){
    this.http.post(this.cart_url+'?id='+id,{}).subscribe((res:any)=>{
      this.sucess('product added to cart')
    })
  }

  fetchBill(){
    this.http.get(this.cart_url+'/bill').subscribe((res:any)=>{
      this.billAmount=res.data
    })
  }

  clearCart(){
    this.http.delete(this.cart_url+'/clear').subscribe((res:any)=>{
      this.sucess('Cart cleared');
      this.fetchCart();
      this.fetchBill();
    })
  }

  updateCart(id:string,action:string){
    this.http.post(this.cart_url+'/update?id='+id+'&action='+action,{}).subscribe((res:any)=>{
      this.sucess('Cart updated');
      this.fetchCart();
      this.fetchBill();
    })
  }

  removeFromCart(id:string){
    this.http.delete(this.cart_url+'?id='+id).subscribe((res:any)=>{
      this.sucess('Item removed from cart');
      this.fetchCart();
      this.fetchBill();
    })
  }
}
