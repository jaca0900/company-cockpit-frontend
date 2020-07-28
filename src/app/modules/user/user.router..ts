import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

const childRoutes: Routes = [
  { path: '', component: UserProfileComponent },
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
