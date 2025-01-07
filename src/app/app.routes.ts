import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { NoAuthGuard } from './_guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./users/pages/user-login-page/user-login-page.component').then(m => m.UserLoginPageComponent),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'posts',
    loadComponent: () => import('./posts/page/posts-list-page/posts-list-page.component').then(m => m.PostsListPageComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/create',
    loadComponent: () => import('./posts/page/posts-creation-page/posts-creation-page.component').then(m => m.PostsCreationPageComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./users/pages/user-register-page/user-register-page.component').then(m => m.UserRegisterPageComponent),
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
