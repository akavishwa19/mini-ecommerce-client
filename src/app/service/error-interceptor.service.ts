import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const errorInterceptorFn: HttpInterceptorFn = (request, next) => {
  const router = inject(Router); // Angular's Router for navigation
  const messageService = inject(MessageService); // PrimeNG MessageService for notifications

  return next(request).pipe(
    catchError((error) => {
      // Handle specific HTTP status codes
      switch (error.status) {
        case 401:
          messageService.add({
            severity: 'warn',
            summary: 'Session Expired',
            detail: 'Please log in again.',
          });
          router.navigate(['/']);
          break;

        case 403:
          messageService.add({
            severity: 'error',
            summary: 'Access Denied',
            detail: 'You do not have permission to perform this action.',
          });
          break;

        case 404:
          messageService.add({
            severity: 'warn',
            summary: 'Not Found',
            detail: error.error.message,
          });
          break;

        case 405:
          messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
          messageService.clear('delete_toast');
          break;

        case 500:
          messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: error.error.message,
          });
          break;

        default:
          // For other statuses, log a generic error
          messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
          break;
      }

      // Re-throw the error to allow further handling by components if needed
      return throwError(() => error);
    })
  );
};
