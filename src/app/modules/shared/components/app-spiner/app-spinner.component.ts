import {Component, Input} from '@angular/core';

@Component({
  templateUrl: './app-spinner.component.html',
  selector: 'app-spinner',
  styleUrls: ['./app-spinner.component.scss']
})
export class AppSpinnerComponent {

  @Input()
  showSpinner: boolean;

  constructor() {}
}
