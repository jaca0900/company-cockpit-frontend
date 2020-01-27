import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../sevices/company.service';
import { ICompany } from '../model/company.interface';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  // TODO: add company model
  public company: ICompany;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.company = {
      id: null,
      nip: '',
      address: '',
      companyName: '',
      isOwnedByUser: false,
    };

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params, params.get('companyId'));
        return this.companyService.getCompanyById(params.get('companyId'))
      })
    ).subscribe((companies) => {
      this.company = companies[0];
    }, () => {
      console.error('Shit is real');
    });
  }

  public updateCompany() {
    this.companyService.updateContractor(this.company)
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
