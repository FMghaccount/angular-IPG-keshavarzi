import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app.component').then((module) => module.AppComponent),
    children: [
      {
        path: 'landing',
        loadChildren: () =>
          import('./components/landing-page/routes').then(
            (module) => module.LANDING_PAGE_ROUTES
          ),
      },
    ],
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./components/payment/routes').then(
        (module) => module.PAYMENT_ROUTES
      ),
  },
];
