import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceCreateComponent } from './components/invoice-create/invoice-create.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './components/invoice-edit/invoice-edit.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';


const childRoutes: Routes = [
  // { path: '', component: InvoiceListComponent },
  { path: 'create', redirectTo: 'create/' },
  { path: 'create/:companyId', component: InvoiceCreateComponent },
  { path: 'edit/:invoiceId', component: InvoiceEditComponent },
  { path: 'details/:invoiceId', component: InvoiceDetailsComponent },
  { path: '', component: InvoiceListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InvoiceRouter { }