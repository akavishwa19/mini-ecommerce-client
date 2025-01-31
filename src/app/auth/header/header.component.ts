import { Component, EventEmitter, inject, Output, TemplateRef } from '@angular/core';
import {
  NgbDatepickerModule,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  @Output() loggedInEventEmmiter =new EventEmitter<boolean>();

  auth_url: string = environment.baseurl + '/auth';
  logged_in: boolean = false;

  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';

  constructor(private http: HttpClient,private router:Router, private messageService: MessageService) {}

ngOnInit(){
	this.authCheck();
}

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  error(message) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

 

  authCheck() {
    this.http.get(this.auth_url + '/auth-check').subscribe((res: any) => {
      this.logged_in = res.data;
      this.loggedInEventEmmiter.emit(this.logged_in);
    });
  }

  logout(){
    this.http.post(this.auth_url + '/logout', {}).subscribe((res: any) => {
      this.router.navigate(['/']);
      setTimeout(()=>{
        window.location.reload()
      },100)
 
    });
  }

  route_to_cart(){
    if(!this.logged_in){
      this.error('Kindly login to view cart');
      return;
    }
    this.router.navigate(['/cart'])
  }
}
