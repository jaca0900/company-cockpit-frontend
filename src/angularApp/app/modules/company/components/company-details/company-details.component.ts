import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../sevices/company.service';
import { ICompany } from '../model/company.interface';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  // TODO: add company model
  public company: ICompany;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.company = {
      id: null,
      nip: '',
      address: '',
      companyName: '',
    };

    console.log('INIT DETAILS');
  }
}
