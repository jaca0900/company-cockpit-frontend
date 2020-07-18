import {Component, Input, OnInit} from '@angular/core';
// import { remote } from 'electron';
import { CompanyService } from '../../sevices/company.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ICompany } from '../model/company.interface';
import { GenericListComponent } from '../../../shared/components/list/generic.list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent extends GenericListComponent<ICompany> implements OnInit {
  // // TODO: add company model
  // public userCompanies: ICompany[]

  @Input()
  displayKeys: string[];

  @Input()
  dataSet: any[];

  @Input()
  headers: string[];

  constructor(private companyService: CompanyService, private router: Router) {
    super();
  }

  ngOnInit() {}
}
