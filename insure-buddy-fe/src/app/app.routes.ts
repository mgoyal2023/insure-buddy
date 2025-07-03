import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [{
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
}, {
    path: 'auth',
    loadComponent: () => import('./components/auth/auth').then(m => m.Auth)
}, {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
    canActivate: [authGuard]
}];
