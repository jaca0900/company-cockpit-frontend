import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GlobalMenuComponent } from './components/global-menu.component';
import { RouterModule } from '@angular/router';
// import { PanelMenuModule } from 'primeng/panelmenu';


@NgModule({
    declarations: [
        GlobalMenuComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        // PanelMenuModule,
    ],
    exports: [
        GlobalMenuComponent
    ],
    providers: [],
    bootstrap: [],
})
export class GlobalMenuModule { }
