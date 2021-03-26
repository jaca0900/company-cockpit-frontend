import { Component } from '@angular/core';

declare const $: any;

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: any[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  expanded;

  menuItems: RouteInfo[] = [
    {path: '/invoice', title: 'Invoices', icon: 'description', class: ''},
    {path: '/company', title: 'Contractors', icon: 'contacts', class: ''},
    {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
  ];

  constructor() {
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
