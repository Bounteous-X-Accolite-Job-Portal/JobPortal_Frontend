import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log("Interceptor hitted");

  const userToken = authService.getToken();

  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  });

  return next(modifiedReq).pipe(
    catchError((err : any) => {
      console.log("error in interceptor", err);
      if(err.status === 401){
        console.log('authInterceptor 401');
        authService.logout();
        router.navigate(["/login"]);
      }
      return throwError(() => new Error('Unauthorized Exception'));
    })
  )
};
