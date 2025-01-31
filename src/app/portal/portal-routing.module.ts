import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsAddComponent } from './products-add/products-add.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';

const routes: Routes = [{ path: '', component: PortalComponent, children:[
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'products-add',
    component:ProductsAddComponent
  },
  {
    path:'products-edit/:id',
    component:ProductsEditComponent
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
export class PortalRoutingModule { }
