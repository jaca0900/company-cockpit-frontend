import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyCreateComponent } from './components/company-create/company-create.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyListComponent } from './components/company-list/company-list.component';


const childRoutes: Routes = [
  { path: '', component: CompanyListComponent },
  { path: 'add', component: CompanyCreateComponent },
  { path: 'edit/:companyId', component: CompanyEditComponent },
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
