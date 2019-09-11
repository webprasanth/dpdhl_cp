import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../container/list/list.component';
import { AddComponent } from '../container/add/add.component';
import { EditComponent } from '../container/edit/edit.component';
import { BusinessUnitIdResolverService } from '../resolver/business-unit-id-resolver.service';
import { BusinessUnitResolverService } from '../resolver/business-unit-resolver.service';
import { BusinessUnitGroupsResolverService } from '../resolver/business-unit-groups-resolver.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      resolveBUList: BusinessUnitResolverService
    },
    data: {
      breadcrumb: 'Business Unit'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddComponent,
    resolve: {
      resolveBUGroup: BusinessUnitGroupsResolverService
    },
    data: {
      breadcrumb: 'Add Business Unit'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      resolveBUById: BusinessUnitIdResolverService,
      resolveBUGroup: BusinessUnitGroupsResolverService
    },
    data: {
      breadcrumb: 'Edit Business Unit'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessUnitRoutingModule {}
