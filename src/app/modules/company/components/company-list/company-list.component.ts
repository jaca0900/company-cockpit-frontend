import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Input()
  title: string;

  @Input()
  isAdd = false;

  @Input()
  actions: {
    tooltip: string;
    icon: string;
    color: string
  }[];

  @Output()
  actionHandler: EventEmitter<{ record: any, actionIndex: number }> = new EventEmitter<{ record: any, actionIndex: number }>();

  @Output()
  addHandler = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {}

  addClick() {
    this.addHandler.emit();
  }

  actionClick(record, actionIndex) {

    this.actionHandler.emit({
      record,
      actionIndex
    });
  }
}
