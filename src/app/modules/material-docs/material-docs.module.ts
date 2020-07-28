import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TableListComponent} from './table-list/table-list.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {MapsComponent} from './maps/maps.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {UpgradeComponent} from './upgrade/upgrade.component';
import {SharedModule} from '@shared/shared.module';
import {MaterialDocsRouter} from './material-docs.router';



@NgModule({
  declarations: [
    DashboardComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent
  ],
  imports: [
    SharedModule,
    MaterialDocsRouter
  ]
})
export class MaterialDocsModule {}
