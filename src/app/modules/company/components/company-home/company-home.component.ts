import { Component, OnInit } from '@angular/core';
// import { remote } from 'electron';
import { CompanyService } from '../../sevices/company.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ICompany } from '../model/company.interface';
import { GenericListComponent } from '../../../shared/components/list/generic.list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent extends GenericListComponent<ICompany> implements OnInit {
  // TODO: add company model
  public userCompanies: ICompany[]

  constructor(private companyService: CompanyService, private router: Router) {
    super();
  }

  ngOnInit() {
    // this.companyService.getUserCompanies()
    // .pipe(
    //   catchError(err => {
    //     console.error('An error occured', err);
    //
    //     return of(err);
    //   })
    // ).subscribe((companies) => {
    //
    //   this.all = this.total = companies;
    //   this.viewSimple();
    // });
  }

  public goToDetails(companyId) {
    console.log(`To details view ${companyId}`);
    this.router.navigate(['/company/details', companyId]);
  }

  public goToEdit(companyId) {
    console.log(`To edit view ${companyId}`);
    this.router.navigate(['/company/edit', companyId]);
  }

  public goToAdd() {
    this.router.navigate(['/company/add']);
  }

  public goToInvoice(companyId) {
    this.router.navigate(['/invoice/create', companyId]);
  }
}
