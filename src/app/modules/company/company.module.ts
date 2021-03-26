import { NgModule } from '@angular/core';
import { CompanyRouter } from './company.router'

import { SharedModule } from '@shared/shared.module';
import {CompanyHomeComponent} from './components/company-home/company-home.component';
import {CompanyFromComponent} from './components/company-form/company-from.component';

@NgModule({
    declarations: [
      CompanyHomeComponent,
      CompanyFromComponent
    ],
    imports: [
      CompanyRouter,
      SharedModule,
    ],
    exports: [
      CompanyFromComponent
    ],
    providers: [],
    bootstrap: [],
})
export class CompanyModule { }
