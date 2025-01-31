import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { ProductsComponent } from './products/products.component';
import { ProductsAddComponent } from './products-add/products-add.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthModule } from '../auth/auth.module';
import { Dialog } from 'primeng/dialog';
import { Avatar } from 'primeng/avatar';

import {
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';

import { Tag } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PortalComponent,
    ProductsComponent,
    ProductsAddComponent,
    ProductsEditComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    AuthModule,
    NbLayoutModule,
    NbIconModule,
    NbCardModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    Avatar,
    Tag,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ToggleSwitch,
    ButtonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PortalModule { }
