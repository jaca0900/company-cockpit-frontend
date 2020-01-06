import { Component, OnInit } from '@angular/core';
// import { remote } from 'electron';
import { CompanyService } from '../sevices/company.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ICompany } from '../model/company.interface';
import { GenericListComponent } from '../../../shared/components/list/generic.list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent extends GenericListComponent<ICompany> implements OnInit {
  // TODO: add company model
  public userCompanies: ICompany[]

  constructor(private companyService: CompanyService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.companyService.getUserCompanies(123654)
    .pipe(
      catchError(err => {
        console.error('An error occured', err);

        return of(err);
      })
    ).subscribe((companies) => this.userCompanies = companies)
  }

  public goToDetails(companyId) {
    console.log(`To details view ${companyId}`);
    this.router.navigate(['/company/details']);
  }

  public goToEdit(companyId) {
    console.log(`To edit view ${companyId}`);
    this.router.navigate(['/company/edit']);
  }

  public goToInvoice(companyId) {
    this.router.navigate(['/invoice/create']);
  }
}
