import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InvoiceRouter } from './invoice.router'

import { InvoiceCreateComponent } from './components/invoice-create/invoice-create.component';
import { SharedModule } from '../shared/shared.module';

import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import {PanelModule} from 'primeng/panel';
import { InvoiceEditComponent } from './components/invoice-edit/invoice-edit.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';


@NgModule({
    declarations: [
      InvoiceCreateComponent,
      InvoiceListComponent,
      InvoiceEditComponent,
      InvoiceDetailsComponent
    ],
    imports: [
      CommonModule,
      InvoiceRouter,
      SharedModule,
      ButtonModule,
      TableModule,
      InputTextareaModule,
      ToolbarModule,
      DropdownModule,
      CalendarModule,
      DialogModule,
      PanelModule
    ],
    exports: [
      InvoiceCreateComponent,
      InvoiceListComponent,
      InvoiceEditComponent,
      InvoiceDetailsComponent
    ],
    providers: [],
    bootstrap: [],
})
export class InvoiceModule { }

