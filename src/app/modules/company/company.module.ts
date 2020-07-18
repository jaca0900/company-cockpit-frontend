import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompanyRouter } from './company.router'

import { CompanyListComponent } from './components/company-list/company-list.component';
import { SharedModule } from '../shared/shared.module';
import { CompanyCreateComponent } from './components/company-create/company-create.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';

@NgModule({
    declarations: [
      CompanyListComponent,
      CompanyCreateComponent,
      CompanyEditComponent,
      CompanyDetailsComponent
    ],
    imports: [
      CommonModule,
      CompanyRouter,
      SharedModule,
    ],
    exports: [
      CompanyListComponent
    ],
    providers: [],
    bootstrap: [],
})
export class CompanyModule { }
