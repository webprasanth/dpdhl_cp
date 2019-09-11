import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../container/list/list.component';
import { AddComponent } from '../container/add/add.component';
import { EditComponent } from '../container/edit/edit.component';
import { DeviceResolverService } from '../resolver/device-resolver.service';
import { DeviceIdResolverService } from '../resolver/device-id-resolver.service';
import { OnboardComponent } from '../container/onboard/onboard.component';
import { ListDetailsComponent } from '../container/list-details/list-details.component';
import { ListDetailByIdResoverService } from '../resolver/list-detail-by-id-resover.service';
import { GroupListComponent } from '../container/group-list/group-list.component';
import { DeviceGroupListResolverService } from '../resolver/device-group-list-resolver.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ListComponent,
  //   resolve: {
  //     resolveDeviceList: DeviceResolverService
  //   },
  //   data: {
  //     breadcrumb: 'Device List'
  //   }
  // },
  {
    path: '',
    component: GroupListComponent,
    resolve: {
      resolveDeviceGroupList: DeviceGroupListResolverService
    },
    data: {
      breadcrumb: 'Device List'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'onboard/:id',
    component: OnboardComponent,
    resolve: {
      resolveDeviceID: DeviceIdResolverService
    },
    data: {
      breadcrumb: 'Device Onboarding'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      breadcrumb: 'Add Device'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      breadcrumb: 'Edit Device'
    },
    resolve: {
      resolveDeviceID: DeviceIdResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'list-detail/:id',
    component: ListDetailsComponent,
    data: {
      breadcrumb: 'Edit Device'
    },
    resolve: {
      resolveDeviceTypeByID: ListDetailByIdResoverService
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule {}
