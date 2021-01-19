import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {UpgradeComponent} from './upgrade/upgrade.component';
import {SharedModule} from '@shared/shared.module';
import {MaterialDocsRouter} from './material-docs.router';



@NgModule({
  declarations: [
    DashboardComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent
  ],
  imports: [
    SharedModule,
    MaterialDocsRouter
  ]
})
export class MaterialDocsModule {}
