import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompanyHomeComponent} from './components/company-home/company-home.component';


const childRoutes: Routes = [
  { path: '', component: CompanyHomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CompanyRouter { }
