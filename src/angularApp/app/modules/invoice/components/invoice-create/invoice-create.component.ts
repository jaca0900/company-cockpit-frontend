import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
   console.log('INIT CREATE');
  }

  createInvoice() {
    console.log('CRATE Invoice');
  }
}
