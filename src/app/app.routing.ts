import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './core/guards/auth-guard.service';

const routes: Routes = [
  { path: 'user-profile', loadChildren: './modules/user/user.module#UserModule' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'home',  redirectTo: '/invoice' },
  // TODO Add a dashboard with some fun stuff canActivate: [AuthGuard], loadChildren: './modules/home/home.module#HomeModule'},
  { path: 'company', canActivate: [AuthGuard], loadChildren: './modules/company/company.module#CompanyModule'},
  { path: 'invoice', canActivate: [AuthGuard], loadChildren: './modules/invoice/invoice.module#InvoiceModule'}  // canActivate: [AuthGuard]
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
