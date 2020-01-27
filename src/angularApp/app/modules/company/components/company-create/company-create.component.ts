import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../sevices/company.service';
import { ICompany } from '../model/company.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  // TODO: add company model
  public company: ICompany

  constructor(
    private companyService: CompanyService,
    private messageService: MessageService) {}

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
    .subscribe((res) => {
        this.messageService.add({severity:'success', summary: 'Success Message', detail:'Company saved'});
        console.log(res);
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error Message', detail:'Error during company saving'});
        console.error(error);
      });
  }
}
