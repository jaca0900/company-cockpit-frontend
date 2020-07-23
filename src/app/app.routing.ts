import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {MapsComponent} from './maps/maps.component';
import {UpgradeComponent} from './upgrade/upgrade.component';
import {IconsComponent} from './icons/icons.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TableListComponent} from './table-list/table-list.component';
import {TypographyComponent} from './typography/typography.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './core/guards/auth-guard.service';

const routes: Routes = [
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'user-profile',   component: UserProfileComponent },
  { path: 'table-list',     component: TableListComponent },
  { path: 'typography',     component: TypographyComponent },
  { path: 'icons',          component: IconsComponent },
  { path: 'maps',           component: MapsComponent },
  { path: 'notifications',  component: NotificationsComponent },
  { path: 'upgrade',        component: UpgradeComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
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
