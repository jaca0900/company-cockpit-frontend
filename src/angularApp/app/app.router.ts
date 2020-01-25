import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './modules/page-not-found/components/page-not-found.component';

import { AuthGuard } from './core/guards/auth-guard.service';
import {HomeComponent} from './modules/home/coponents/home.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'home',  redirectTo: '/company' }, // TODO Add a dashboard with some fun stuff canActivate: [AuthGuard], loadChildren: './modules/home/home.module#HomeModule'},
  { path: 'company', canActivate: [AuthGuard], loadChildren: './modules/company/company.module#CompanyModule'},
  { path: 'invoice', canActivate: [AuthGuard], loadChildren: './modules/invoice/invoice.module#InvoiceModule' },
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
