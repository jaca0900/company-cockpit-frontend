import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import { remote } from 'electron';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./tablecomponent.scss']
})
export class TableComponent implements OnInit {
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

  constructor() {}

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
