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
  public company: ICompany

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.company = {
      id: null,
      nip: '',
      address: '',
      companyName: '',
    };
    console.log('INIT CREATE');
  }

  createCompany() {
    console.log('CRATE COMPANY');
  }
}
