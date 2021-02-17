import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import {CompanyHomeComponent} from './components/company-home/company-home.component';


const childRoutes: Routes = [
  { path: '', component: CompanyHomeComponent },
  { path: 'details/:companyId', component: CompanyDetailsComponent }
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
