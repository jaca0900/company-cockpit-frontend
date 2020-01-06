import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../sevices/company.service';
import { ICompany } from '../model/company.interface';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  // TODO: add company model
  public userCompanies: ICompany[]

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
   console.log('INIT CREATE');
  }

  createCompany() {
    console.log('CRATE COMPANY');
  }
}
