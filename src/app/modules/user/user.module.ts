import {NgModule} from '@angular/core';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {SharedModule} from '@shared/shared.module';
import {UserRouter} from './user.router.';
import {CompanyModule} from '@copmany/company.module';
import {UserRegisterComponent} from './components/user-registration/user-register.component';

@NgModule({
  imports: [
    SharedModule,
    UserRouter,
    CompanyModule
  ],
  providers: [],
  declarations: [UserProfileComponent, UserRegisterComponent]
})
export class UserModule {}
