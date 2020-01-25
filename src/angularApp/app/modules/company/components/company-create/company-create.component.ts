import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../sevices/company.service';
import { ICompany } from '../model/company.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  // TODO: add company model
  public company: ICompany

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.company = {
      id: null,
      nip: '',
      address: '',
      companyName: '',
      isOwnedByUser: false
    };
  }

  createCompany() {
    this.companyService.saveUserContractor(this.company)
      .pipe(
        catchError(err => {
          console.error('An error occured', err);

          return of(err);
        })
      ).subscribe((result) => {
        alert('Success');
        console.log(result);
      });
  }
}
