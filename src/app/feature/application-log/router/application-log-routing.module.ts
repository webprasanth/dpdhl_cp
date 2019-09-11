import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsComponent } from '../container/logs/logs.component';
import { ApplicationLogResolverService } from '../resolver/application-log-resolver.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LogsComponent,
    resolve: { resolveLogList: ApplicationLogResolverService },
    data: {
      breadcrumb: 'Logs'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationLogRoutingModule {}
