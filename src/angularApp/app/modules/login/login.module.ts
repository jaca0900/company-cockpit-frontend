import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRouter } from './login.router';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRouter,
    SharedModule
  ],
  providers: []
})
export class LoginModule { }
