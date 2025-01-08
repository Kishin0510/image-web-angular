import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';
import { ToastService } from '../_services/toast.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (localStorageService.getVariable('token')) {
    return true;
  } else {
    toast.error('Debe iniciar sesión.');
    router.navigate(['/auth']);
    return false;
  }
}
