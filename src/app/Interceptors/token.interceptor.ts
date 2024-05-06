import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/CandidateAuthentication/auth.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userToken = authService.getToken();

  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  });

  return next(modifiedReq);
  // return next(modifiedReq).pipe(
  //   catchError((err : any) => {
  //     console.log(err);
  //     if (err.status === 401) {
  //       console.log('authInterceptor 401');
  //       authService.
  //       router.navigate(['/auth/signout']);
  //     }
  //     return throwError(() => new Error('Unauthorized Exception'));
  //   })
  // );
};
