import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../container/dashboard/dashboard.component';
import { ListComponent } from '../container/list/list.component';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';
import { GetDetailsbyEmailService } from '../resolver/get-detailsby-email.service'
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      resolveByEmail: GetDetailsbyEmailService

    },
    canActivate: [AuthGuard]
  },
  {
    path: 'ownerList',
    component: ListComponent,
    // resolve: {
    //   applicationList: ApplicationListResolverService
    // },
    data: {
      breadcrumb: 'Application Owner'
    },
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
