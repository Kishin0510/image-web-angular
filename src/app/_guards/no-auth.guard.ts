import {inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';

export const NoAuthGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (localStorageService.getVariable('token')) {
    router.navigate(['/posts']);
    return false;
  } else {
    return true;
  }
}
