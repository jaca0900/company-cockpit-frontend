import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../sevices/company.service';
import { ICompany } from '../model/company.interface';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  // TODO: add company model
  public company: ICompany;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router) {
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
}
