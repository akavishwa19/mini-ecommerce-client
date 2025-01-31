import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environment/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.scss',
})
export class ProductsAddComponent {
  productUrl: string = environment.baseurl + '/product';
  uploadUrl: string = environment.baseurl + '/upload';

  //
  form: FormGroup;
  update_id: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
  ) {
    this.update_id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      product_code: [null, ],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });
    //this.get();
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

  get form_controls() {
    return this.form.controls;
  }

  put() {
    this.http
      .put(this.productUrl + '?id=' + this.update_id, this.form.value)
      .subscribe((res: any) => {});
  }

  post() {
    this.http.post(this.productUrl, this.form.value).subscribe((res: any) => {
      this.form.reset();
      this.sucess('data posted successfully')
    });
  }

  get() {
    this.http
      .get(this.productUrl + '/single?id=' + this.update_id)
      .subscribe((res: any) => {
        this.form.patchValue(res);
      });
  }

  photoUpload(e: any) {
    var formData: any = new FormData();

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      }),
    };
    formData.append('file', (event.target as HTMLInputElement).files[0]);
    this.http
      .post(this.uploadUrl + '/upload-media', formData, httpOptions)
      .subscribe((res: any) => {
        this.form.get('image').setValue(res.data.url);
      });
  }
}
