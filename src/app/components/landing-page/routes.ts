import { Routes } from '@angular/router';

export const LANDING_PAGE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing.component').then(
        (module) => module.LandingComponent
      ),
    pathMatch: 'full',
  },
];
