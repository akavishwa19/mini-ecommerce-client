import { Component } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  product_url:string=environment.baseurl+'/product';
  cart_url:string=environment.baseurl+'/cart';

  products:any=[];
  loggedIn:boolean=false;

  constructor(private http:HttpClient,    private messageService: MessageService,){

  }

  ngOnInit(){
    this.fetchProducts()
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

  fetchProducts(){
    this.http.get(this.product_url).subscribe((res:any)=>{
      this.products=res.data;
    })
  }

  addToCart(id:string){
    if(!this.loggedIn){
      this.error('Kindly login before adding to cart');
      return;
    }
    this.http.post(this.cart_url+'?id='+id,{}).subscribe((res:any)=>{
      this.sucess('product added to cart')
    })
  }

  handleLoggedInEvent(event:boolean){
    this.loggedIn=event;
  }
}
