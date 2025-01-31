import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { AuthModule } from '../auth/auth.module';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagesComponent,
    ShopComponent,
    CheckoutComponent,
    OrdersComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AuthModule,
    TooltipModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
