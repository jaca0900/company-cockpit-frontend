import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';
import { CompanyRouter } from './company.router'
import { ButtonModule } from 'primeng/button';

import { CompanyListComponent } from './components/company-list/company-list.component';
import { SharedModule } from '../shared/shared.module';
import { CompanyCreateComponent } from './components/company-create/company-create.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import {InputTextareaModule} from 'primeng/inputtextarea';

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
      ButtonModule,
      TableModule,
      InputTextareaModule,
      SharedModule,
      ButtonModule
    ],
    exports: [
      CompanyListComponent
    ],
    providers: [],
    bootstrap: [],
})
export class CompanyModule { }
