import { Routes } from '@angular/router';

export const LANDING_PAGE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page.component').then(
        (module) => module.LandingPageComponent
      ),
    pathMatch: 'full',
    children: [
      {
        path: ':transaction',
        loadComponent: () =>
          import('./landing/landing.component').then(
            (module) => module.LandingComponent
          ),
      },
    ],
  },
];
