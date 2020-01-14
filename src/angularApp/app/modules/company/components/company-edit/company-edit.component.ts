import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../sevices/company.service';
import { ICompany } from '../model/company.interface';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
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
    console.log('INIT EDIT');
  }

  public updateCompany() {
    console.log('UPDATE COMPANY');
  }
}
