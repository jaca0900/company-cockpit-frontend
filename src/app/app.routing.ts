import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {MapsComponent} from './modules/material-docs/maps/maps.component';
import {UpgradeComponent} from './modules/material-docs/upgrade/upgrade.component';
import {IconsComponent} from './modules/material-docs/icons/icons.component';
import {UserProfileComponent} from './modules/user/components/user-profile/user-profile.component';
import {TableListComponent} from './modules/material-docs/table-list/table-list.component';
import {TypographyComponent} from './modules/material-docs/typography/typography.component';
import {NotificationsComponent} from './modules/material-docs/notifications/notifications.component';
import {DashboardComponent} from './modules/material-docs/dashboard/dashboard.component';
import {AuthGuard} from './core/guards/auth-guard.service';

const routes: Routes = [
  // { path: 'dashboard',      component: DashboardComponent },
  // { path: 'table-list',     component: TableListComponent },
  // { path: 'typography',     component: TypographyComponent },
  // { path: 'icons',          component: IconsComponent },
  // { path: 'maps',           component: MapsComponent },
  // { path: 'notifications',  component: NotificationsComponent },
  // { path: 'upgrade',        component: UpgradeComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard',   canActivate: [AuthGuard], loadChildren: './modules/material-docs/material-docs.module#MaterialDocsModule' },
  { path: 'user-profile',   canActivate: [AuthGuard], loadChildren: './modules/user/user.module#UserModule' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'home',  redirectTo: '/dashboard' }, // TODO Add a dashboard with some fun stuff canActivate: [AuthGuard], loadChildren: './modules/home/home.module#HomeModule'},
  { path: 'company', canActivate: [AuthGuard], loadChildren: './modules/company/company.module#CompanyModule'},
  // { path: 'invoice', canActivate: [AuthGuard], loadChildren: './modules/invoice/invoice.module#InvoiceModule' },
  // { path: '**', component: PageNotFoundComponent}
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
