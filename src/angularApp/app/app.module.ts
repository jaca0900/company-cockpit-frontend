// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRouter } from './app.router';
import { CardModule } from 'primeng/card';
import { GlobalMenuModule } from './modules/global-menu/global-menu.module'
import { GlobalHeaderModule } from './modules/global-header/global-header.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        // BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRouter,
        CardModule,
        GlobalMenuModule,
        GlobalHeaderModule,
        ToastModule
    ],
    providers: [MessageService],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
