import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authUrl: string = environment.baseurl + '/auth';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private http: HttpClient,
    private location: Location,
    private router:Router
  ) {
    this.form = this.fb.group({
    
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
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

  submit() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      }),
      withCredentials: true
    };

    this.http
      .post(this.authUrl + '/login', this.form.value,httpOptions)
      .subscribe((res: any) => {
        this.form.reset();
        this.sucess(res.message);
        if(res.data.role=='admin'){
          this.router.navigate(['/portal/products']);
          return;
        }
        this.router.navigate(['/']);
      });
  }

  goBack() {
    this.location.back();
  }

  type:string='text';

  toggleType(){
    this.type='password'
  }

  toggleTypeBack(){
    this.type='text'
  }
}
