import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../modules/shared/shared.module';
import { LoginModule } from '../modules/login/login.module';
import { PageNotFoundModule } from '../modules/page-not-found/page-not-found.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavbarModule } from '../modules/navbar/navbar.module';


@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    NavbarModule,
    LoginModule,
    PageNotFoundModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [
    HttpClientModule,
    SharedModule,
    NavbarModule,
    LoginModule,
    PageNotFoundModule
  ]
})
export class CoreModule { }
