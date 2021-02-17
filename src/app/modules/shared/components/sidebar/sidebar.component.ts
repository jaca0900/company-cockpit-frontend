import {Component, OnInit} from '@angular/core';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: any[];
}

export const ROUTES: RouteInfo[] = [
  {path: '/invoice', title: 'Invoices', icon: 'description', class: ''},
  {path: '/company', title: 'Contractors', icon: 'contacts', class: ''},
  {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  expanded;

  constructor() {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
