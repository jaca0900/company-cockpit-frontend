import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICompany} from '../model/company.interface';
import {CompanyService} from '../../sevices/company.service';
import { remove } from 'lodash';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html'
})
export class CompanyFromComponent implements OnInit {
  @Input()
  company: ICompany = {} as ICompany

  @Input()
  disposable = false;

  @Input()
  mode = 'create';

  @Input()
  title: string;

  @Input()
  owned = false;

  @Input()
  submitLabel = 'Save';

  @Input()
  selectCompany = false;

  @Input()
  isSeller;

  @Input()
  isBuyer;

  @Output()
  dispose = new EventEmitter();

  sellers: ICompany[];

  buyers: ICompany[];

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    console.log(this.isSeller, this.isBuyer);
    if (this.selectCompany) {
      this.companyService.getUserCompanies()
        .subscribe((companies) => {

          this.sellers = companies;
          this.buyers = remove(this.sellers, (company) => !company.isOwnedByUser);
        });
    }
  }

  formSubmit() {
    this.company.isOwnedByUser = this.owned;

    switch (this.mode) {
      case 'edit':

        this.companyService.updateContractor(this.company)
          .subscribe(() => {
            console.log('success');
          });
        break;
      case 'create':
        console.log(this.mode)
        this.companyService.saveUserContractor(this.company)
          .subscribe(() => {
            console.log('success');
          });
        break;
    }
  }

  closeForm() {
    this.dispose.emit();
  }
}
