import { Component } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  order_url:string=environment.baseurl+'/order';

  orders:any[]=[];

  constructor(private http:HttpClient){

  }

  ngOnInit(){
    this.fetchOrders()
  }

  fetchOrders(){
    this.http.get(this.order_url+'/by-user').subscribe((res:any)=>{
      this.orders=res.data;
    })
  }
}
