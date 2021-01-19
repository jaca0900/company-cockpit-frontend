import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './modules/material-docs/components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from './core/core.module';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // ComponentsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    CoreModule,
    // below stuff should be from core module
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
