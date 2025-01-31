import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  authUrl: string = environment.baseurl + '/auth';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private http: HttpClient,
    private location: Location
  ) {
    this.form = this.fb.group({
      fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
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

    if(this.form.value.password.length<8){
      this.error('Minimum password length is 8');
      return;
    }

    this.http
      .post(this.authUrl + '/register', this.form.value)
      .subscribe((res: any) => {
        this.form.reset();
        this.sucess(res.message);
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
