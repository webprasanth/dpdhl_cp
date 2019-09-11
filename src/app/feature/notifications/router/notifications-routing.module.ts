import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from '../container/notification/notification.component';
import { NotificationResolverService } from 'src/app/feature/notifications/resolver/notification-resolver.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: NotificationComponent,
    resolve: {
      resolveAlerts: NotificationResolverService
    },
    data: {
      breadcrumb: 'Notifications'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {}
