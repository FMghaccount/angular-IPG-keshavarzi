import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/landing-page/routes').then(
        (module) => module.LANDING_PAGE_ROUTES
      ),
    pathMatch: 'full',
  },
];
