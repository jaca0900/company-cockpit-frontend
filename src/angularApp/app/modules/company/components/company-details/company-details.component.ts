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
  public userCompanies: ICompany[]

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
   console.log('INIT DETAILS');
  }
}
