import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

import { Router } from '@angular/router';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent {
  auth_url: string = environment.baseurl + '/auth';

  user_data: any = {};
  side_menu_state: string = 'collapsed';

  dropdown: boolean = false;

  adminMenu: any[] = [
    {
      key: 'dashboard',
      title: 'PRODUCTS',
      icon: 'home-outline',
      link: '/portal/products',
    },
    {
      key: 'products',
      title: 'ORDERS',
      icon: 'attach-outline',
      link: '/portal/orders',
    },
  ];

  constructor(
    private http: HttpClient,
    private sidebarService: NbSidebarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.me();
  }

  toggle_side_menu() {
    this.sidebarService.toggle(true, 'right');
  }

  toggle_dropdown() {
    this.dropdown = !this.dropdown;
  }

  me() {
    this.http.get(this.auth_url).subscribe((res: any) => {
      this.user_data = res.data;
    });
  }

  logout() {
    this.http.post(this.auth_url + '/logout', {}).subscribe((res: any) => {
      this.router.navigate(['/']);
    });
  }
}
