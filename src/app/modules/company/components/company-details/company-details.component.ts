import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../sevices/company.service';
import { ICompany } from '../model/company.interface';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GenericListComponent } from '../../../shared/components/list/generic.list.component';
import { InvoiceService } from '../../../invoice/services/invoice.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent extends GenericListComponent<{ [key: string]: any }> implements OnInit {
  // TODO: add company model
  public company: ICompany;

  constructor(
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router) {
      super();
  }

  ngOnInit() {
    this.company = {
      id: null,
      nip: '',
      address: '',
      companyName: '',
      isOwnedByUser: false,
    };

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {

        return this.companyService.getCompanyById(params.get('companyId'))
      })
    ).subscribe((companies) => {
      this.company = companies[0];
      const observable = this.company.isOwnedByUser ?
        this.invoiceService.getBySellerID(this.company.id):
        this.invoiceService.getByBuyerID(this.company.id);

      observable.subscribe(
        (invoices) => {
          this.all = this.total = invoices;
          this.viewSimple();
        })
    }, () => {
      console.error('Shit is real');
    });
  }
}
