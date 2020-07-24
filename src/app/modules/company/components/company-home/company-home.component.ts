import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../sevices/company.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ICompany } from '../model/company.interface';
import { Router } from '@angular/router';
import {animate, group, query, stagger, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
  animations: [
    trigger('companyForm', [
      transition(':enter', [
        style({transform: 'translateX(100%)', position: 'fixed', right: 0}),
        animate('500ms', style({transform: 'translateX(0%)', position: 'fixed', right: 0 }))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0%)', position: 'fixed', right: 0}),
        animate('300ms', style({transform: 'translateX(100%)', position: 'fixed', right: 0 }))
      ])
    ]),
  ]
})
export class CompanyHomeComponent implements OnInit {
  // TODO: add company model
  public userCompanies: ICompany[]

  showCompanyForm = false;

  selectedCompany: ICompany;

  mode = 'create';

  actions = [{
    icon: 'create',
    tooltip: 'edit',
    handler: (row) => {
      console.log('edit', row);
      this.mode = 'edit';
      this.selectedCompany = { ...row };
      this.showCompanyForm = true;
    }
  }, {
    icon: 'clear',
    tooltip: 'Remove company',
    color: 'danger',
    handler: (row) => {}
  }];

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit() {
    this.companyService.getUserCompanies()
    .pipe(
      catchError(err => {
        console.error('An error occured', err);

        return of(err);
      })
    ).subscribe((companies) => {
      this.userCompanies = companies;
    });
  }

  public openCloseForm() {
    this.mode = 'create';
    this.selectedCompany = {} as ICompany;
    this.showCompanyForm = true;
  }

  public disposeForm() {
    this.showCompanyForm = false;
  }

  // public goToInvoice(companyId) {
  //   this.router.navigate(['/invoice/create', companyId]);
  // }

  handleActionClick({ actionIndex, record }) {
    this.actions[actionIndex].handler(record);
  }
}
