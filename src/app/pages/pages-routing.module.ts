import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [{ path: '', component: PagesComponent, children:[
  {
    path:'',
    component:ShopComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'orders',
    component:OrdersComponent
  },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
