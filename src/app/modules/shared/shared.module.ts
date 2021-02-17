import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TypeofPipe} from './typeOf.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TableComponent} from '@shared/components/table/table.component';
import {SidebarComponent} from '@shared/components/sidebar/sidebar.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    TypeofPipe,
    TableComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [],
  exports: [
    TableComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeofPipe,
    MatCheckboxModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    SidebarComponent
  ]
})
export class SharedModule {}
