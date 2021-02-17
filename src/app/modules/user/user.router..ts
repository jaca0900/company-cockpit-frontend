import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserRegisterComponent} from './components/user-registration/user-register.component';
import {AuthGuard} from '@core/guards/auth-guard.service';

const childRoutes: Routes = [
  { path: 'register', component: UserRegisterComponent },
  { path: '', canActivate: [AuthGuard], component: UserProfileComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRouter { }
