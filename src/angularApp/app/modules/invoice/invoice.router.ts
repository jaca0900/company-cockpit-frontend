import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceCreateComponent } from './components/invoice-create/invoice-create.component';


const childRoutes: Routes = [
  // { path: '', component: InvoiceListComponent },
  { path: 'create', component: InvoiceCreateComponent }
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