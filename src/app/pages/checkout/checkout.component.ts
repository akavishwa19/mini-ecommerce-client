import { Component } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  product_url:string=environment.baseurl+'/product';
  cart_url:string=environment.baseurl+'/cart';
  order_url:string=environment.baseurl+'/order';

  products:any=[];
  billAmount:number=0;

  form:FormGroup;

  constructor(private http:HttpClient, private fb:FormBuilder , private messageService: MessageService,private router:Router){
    this.form=this.fb.group({
      country:[null , [Validators.required]],
      state:[null , [Validators.required]],
      city:[null , [Validators.required]],
      pincode:[null , [Validators.required]],
    })

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

  get f() {
    return this.form.controls;
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

  placeOrder(){
    if(this.form.invalid){
      this.error('fill in the shipping details');
      return;
    }

    this.http.post(this.order_url,this.form.value).subscribe((res:any)=>{
      this.sucess('Order placed succesfully');
      setTimeout(()=>{
        this.router.navigate(['/orders'])
      },1300)
   
    })

  }

}
