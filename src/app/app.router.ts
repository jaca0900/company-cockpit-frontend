import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './modules/page-not-found/components/page-not-found.component';

import { AuthGuard } from './core/guards/auth-guard.service';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], loadChildren: './modules/forecast/forecast.module#ForecastModule' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true,
      },
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouter {}
