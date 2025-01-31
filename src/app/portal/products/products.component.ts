import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productUrl: string = environment.baseurl+'/product'
  
  data: any = [];
  delete_id: string = '';

  visible: boolean = false;

  //pagination
  totalRecords: number;
  rows: number = 5;
  currentPage: number = 1;
  search_string: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.get(1);
  }

  success(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  onReject() {
    this.messageService.clear('delete_toast');
    this.visible = false;
  }

  onDelete(id: string) {
    this.delete_id = id;
    this.messageService.clear('delete_toast');
    if (!this.visible) {
      this.messageService.add({
        key: 'delete_toast',
        sticky: true,
        severity: 'warning',
        summary: 'Delete',
      });
    }
  }

  onPageChange(event: any) {
    this.get(event.first / event.rows + 1);
  }

  get(page: number) {
    const filterQuery = encodeURIComponent(this.search_string);
    this.http
      .get(
        this.productUrl +
          `/ssr?page=${page}&size=${this.rows}&filter=${filterQuery}`
      )
      .subscribe((res: any) => {
        this.data = res.data.data;
        this.totalRecords = res.data.totalRecords;
        this.currentPage = page;
      });
  }

  delete() {
    this.http
      .delete(this.productUrl + '?id=' + this.delete_id)
      .subscribe((res: any) => {
        this.success(res.message);
        this.messageService.clear('delete_toast');
        this.get(1);
        this.visible = false;
      });
  }

  router_to_edit(id: string) {
    this.router.navigate(['/portal/products-edit', id]);
  }


}
