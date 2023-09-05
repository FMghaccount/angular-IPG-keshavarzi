import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./payment.component').then((module) => module.PaymentComponent),
    pathMatch: 'full',
  },
];
