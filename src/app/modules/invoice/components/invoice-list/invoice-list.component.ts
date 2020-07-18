import { Component, OnInit } from '@angular/core';
// import { remote } from 'electron';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenericListComponent } from '../../../shared/components/list/generic.list.component';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends GenericListComponent<{ [key: string]: any }> implements OnInit {

  constructor(private invoiceService: InvoiceService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.invoiceService.getUserInvoices()
      .subscribe((invoices) => {

        this.all = this.total = invoices;
        this.viewSimple();
        console.log(this.displayData)
      },
      (err) => {
        console.error('An error occured', err);

        return of(err);
      });
  }

  public goToDetails(invoiceId) {
    console.log(`To details view ${invoiceId}`);
    this.router.navigate(['/invoice/details', invoiceId]);
  }

  public goToEdit(invoiceId) {
    console.log(`To edit view ${invoiceId}`);
    this.router.navigate(['/invoice/edit', invoiceId]);
  }

  public goToAdd() {
    this.router.navigate(['/invoice/create']);
  }
}
