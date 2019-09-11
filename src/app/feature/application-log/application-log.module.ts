import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './container/logs/logs.component';
import { ApplicationLogRoutingModule } from './router/application-log-routing.module';
import { ApplicationLogResolverService } from './resolver/application-log-resolver.service';
import { ApplicationLogService } from './service/application-log.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [LogsComponent],
  imports: [CommonModule, ApplicationLogRoutingModule, SharedModule],
  providers: [ApplicationLogService, ApplicationLogResolverService]
})
export class ApplicationLogModule {}
