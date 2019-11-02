import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { remote } from 'electron';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    menu: MenuItem[];

    ngOnInit(): void {
        this.menu = [
            {
                label: 'Dashboard',
                icon: 'pi pi-pw pi-th-large',
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
