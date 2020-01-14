import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';
import { InvoiceRouter } from './invoice.router'
import { ButtonModule } from 'primeng/button';

import { InvoiceCreateComponent } from './components/invoice-create/invoice-create.component';
import { SharedModule } from '../shared/shared.module';


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
    ],
    exports: [
      InvoiceCreateComponent
    ],
    providers: [],
    bootstrap: [],
})
export class InvoiceModule { }

