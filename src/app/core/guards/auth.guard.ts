import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const allowedRoles = route.data['roles'] as string[];
  const currentRole = localStorage.getItem('role') || 'Viewer';

  if (allowedRoles.includes(currentRole)) {
    return true;
  }
  snackBar.open('Log in as admin to view settings', 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
  });
  router.navigate(['/dashboard']);
  return false;
};
