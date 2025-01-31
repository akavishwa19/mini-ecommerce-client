import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {

  const authReq = req.clone({
    withCredentials: true,
  });

  console.log('in here?')

  return next(authReq);
};
