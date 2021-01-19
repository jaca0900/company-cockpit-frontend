import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICompany} from '../model/company.interface';
import {CompanyService} from '../../sevices/company.service';
import { remove } from 'lodash';
import {NotificationService} from '@shared/services/notification.service';

declare var $: any;

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFromComponent implements OnInit {

  @Input()
  required = false;

  @Input()
  company: ICompany = {} as ICompany

  @Input()
  disposable = false;

  @Input()
  disabled = false;

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

  @Output()
  updateCompanies = new EventEmitter();

  @Output()
  setCompany = new EventEmitter<{
    type: string,
    company: ICompany
  }>();

  sellers: ICompany[];

  buyers: ICompany[];

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
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
            this.updateCompanies.emit(this.company);
          });
        break;
      case 'create':
        delete this.company.id;
        this.companyService.saveUserContractor(this.company)
          .subscribe(([ [res] ] ) => {
            this.company.id = res.id

            this.updateCompanies.emit(res);
            NotificationService.showNotification('success', 'Success', 'Company saved successfully.');
          }, (err) => {
            console.error(err);
            NotificationService.showNotification('danger', 'Error', 'Error saving company this nip number is already taken.');
          });
        break;
    }
  }

  closeForm() {
    this.dispose.emit();
  }

  setSellectedCompany(company: ICompany, modalId: string, type: string) {
    console.log('EMIT', company);
    this.setCompany.emit({ type, company });
    $(`#${modalId}`).modal('hide');
  }
}
