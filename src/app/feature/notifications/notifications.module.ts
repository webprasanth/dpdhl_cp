import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './container/notification/notification.component';
import { NotificationRoutingModule } from './router/notifications-routing.module';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, NotificationRoutingModule, SharedModule, MatSelectModule, MatFormFieldModule, MatTableModule]
})
export class NotificationsModule { }
