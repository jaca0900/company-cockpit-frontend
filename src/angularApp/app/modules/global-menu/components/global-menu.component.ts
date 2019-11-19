import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { remote } from 'electron';

@Component({
    selector: 'app-global-menu',
    templateUrl: './global-menu.component.html',
    styleUrls: ['./global-menu.component.scss']
})
export class GlobalMenuComponent implements OnInit {
    menu: MenuItem[];

    constructor() {}

    ngOnInit() {
        this.menu = [
            {
                label: 'Dashboard',
                icon: 'pi pi-pw pi-th-large',
                url: '/home'
            }, {
                label: 'Contractors',
                icon: 'pi pi-fw pi-users',
                url: '/contractors',
            }, {
                label: 'Invoices',
                icon: 'pi pi-fw pi-inbox',
            }, {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
            },
        ];
    }

    close(): void {
        remote.getCurrentWindow().close();
    }

    minimize(): void {
        remote.getCurrentWindow().minimize();
    }

    maximize(): void {
        remote.getCurrentWindow().maximize();
    }

}
