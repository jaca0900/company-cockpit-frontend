import { NgModule } from '@angular/core';
import { CompanyRouter } from './company.router'

import { CompanyListComponent } from './components/company-list/company-list.component';
import { SharedModule } from '../shared/shared.module';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import {CompanyHomeComponent} from './components/company-home/company-home.component';
import {CompanyFromComponent} from './components/company-form/company-from.component';

@NgModule({
    declarations: [
      CompanyHomeComponent,
      CompanyListComponent,
      CompanyDetailsComponent,
      CompanyFromComponent
    ],
    imports: [
      CompanyRouter,
      SharedModule,
    ],
    exports: [
      CompanyListComponent,
      CompanyFromComponent
    ],
    providers: [],
    bootstrap: [],
})
export class CompanyModule { }
