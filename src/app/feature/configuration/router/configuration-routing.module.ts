import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../container/list/list.component';
import { DeviceConfigAddComponent } from '../container/device-config-add/device-config-add.component';
import { DeviceConfigEditComponent } from '../container/device-config-edit/device-config-edit.component';
import { ConfigurationResolverService } from '../resolver/configuration-resolver.service';
import { DeviceSpecIdResolverService } from '../resolver/device-spec-id-resolver.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      resolveDeviceSpec: ConfigurationResolverService
    },
    data: {
      breadcrumb: 'Configuration'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: DeviceConfigAddComponent,
    data: {
      breadcrumb: 'Add Device Config'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: DeviceConfigEditComponent,
    resolve: {
      resolveDeviceSpecId: DeviceSpecIdResolverService
    },
    data: {
      breadcrumb: 'Edit Device Config'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
