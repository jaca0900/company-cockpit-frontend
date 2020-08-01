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
  {path: '/company', title: 'Contractors', icon: 'contacts', class: ''},
  {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
  {path: '/invoice', title: 'Invoices', icon: 'description', class: ''},
  {
    path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '',
    children: [
      {path: '/dashboard/table-list', title: 'Table List', icon: 'content_paste', class: ''},
      {path: '/dashboard/typography', title: 'Typography', icon: 'library_books', class: ''},
      {path: '/dashboard/icons', title: 'Icons', icon: 'bubble_chart', class: ''},
      {path: '/dashboard/maps', title: 'Maps', icon: 'location_on', class: ''},
      {path: '/dashboard/notifications', title: 'Notifications', icon: 'notifications', class: ''}
    ]
  },
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
