import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GlobalHeaderComponent } from './components/global-header.component';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    GlobalHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    ButtonModule,
  ],
  exports: [ 
    GlobalHeaderComponent 
  ],
  providers: [],
  bootstrap: [],
})
export class GlobalHeaderModule { }
