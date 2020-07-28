import { Component, OnInit } from '@angular/core';
import {StorageService} from '@shared/services/storage/storage.service';
import {ICompany} from '@copmany/components/model/company.interface';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {CompanyService} from '@copmany/sevices/company.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user;

  showCompanyForm = false;

  userCompanies: ICompany[];

  mode: string;

  selectedCompany: ICompany;

  actions = [{
    icon: 'create',
    tooltip: 'edit',
    handler: (row) => {
      console.log('edit', row);
      this.mode = 'edit';
      this.selectedCompany = { ...row };
      this.showCompanyForm = true;
    }
  }];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    console.log(StorageService.getItem('User'));
    this.user = StorageService.getItem('User');

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

  openCloseForm() {
    this.mode = 'create';
    this.selectedCompany = {} as ICompany;
    this.showCompanyForm = !this.showCompanyForm;
  }

  handleActionClick({ actionIndex, record }) {
    this.actions[actionIndex].handler(record);
  }

  public disposeForm() {
    this.showCompanyForm = false;
  }
}
