import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRouter } from './login.router';
// import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    LoginRouter,
    SharedModule,
    // ButtonModule
  ],
  providers: []
})
export class LoginModule { }
