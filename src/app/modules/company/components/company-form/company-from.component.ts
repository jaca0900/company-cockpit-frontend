import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICompany} from '../model/company.interface';
import {CompanyService} from '../../sevices/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html'
})
export class CompanyFromComponent {
  @Input()
  company: ICompany = {} as ICompany

  @Input()
  mode = 'create';

  @Input()
  title: string;

  @Input()
  owned = false;

  @Output()
  dispose = new EventEmitter();

  constructor(private companyService: CompanyService) {}

  formSubmit() {
    this.company.isOwnedByUser = this.owned;

    switch (this.mode) {
      case 'edit':

        this.companyService.updateContractor(this.company);
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
