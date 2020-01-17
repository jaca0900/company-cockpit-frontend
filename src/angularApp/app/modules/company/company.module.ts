import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompanyRouter } from './company.router'

import { CompanyListComponent } from './components/company-list/company-list.component';
import { SharedModule } from '../shared/shared.module';
import { CompanyCreateComponent } from './components/company-create/company-create.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';

import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import {CheckboxModule} from 'primeng/checkbox';
import {PanelModule} from 'primeng/panel';

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
      CheckboxModule,
      ButtonModule,
      TableModule,
      InputTextareaModule,
      ToolbarModule,
      SharedModule,
      ButtonModule,
      PanelModule
    ],
    exports: [
      CompanyListComponent
    ],
    providers: [],
    bootstrap: [],
})
export class CompanyModule { }
