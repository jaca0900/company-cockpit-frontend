import {NgModule} from '@angular/core';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {SharedModule} from '@shared/shared.module';
import {UserRouter} from './user.router.';

@NgModule({
  imports: [
    SharedModule,
    UserRouter
  ],
  providers: [],
  declarations: [UserProfileComponent]
})
export class UserModule {}
