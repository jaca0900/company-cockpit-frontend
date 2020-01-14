import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InvoiceRouter } from './invoice.router'

import { InvoiceCreateComponent } from './components/invoice-create/invoice-create.component';
import { SharedModule } from '../shared/shared.module';

import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
    declarations: [
      InvoiceCreateComponent
    ],
    imports: [
      CommonModule,
      InvoiceRouter,
      SharedModule,
      ButtonModule,
      TableModule,
      InputTextareaModule,
      ToolbarModule
    ],
    exports: [
      InvoiceCreateComponent
    ],
    providers: [],
    bootstrap: [],
})
export class InvoiceModule { }

