import { LocalStorageService } from './../_services/local-storage.service';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getVariable('token');
  const router = inject(Router);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorageService.removeVariable('token');
        localStorageService.removeVariable('email');
        localStorageService.updateLoginStatus(false);
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};
