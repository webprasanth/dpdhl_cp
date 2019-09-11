import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from '../container/list/list.component';
import { EditComponent } from '../container/edit/edit.component';
import { RoleMappingComponent } from '../container/role-mapping/role-mapping.component';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from '../container/add/add.component';
import { RbackDetailsByIdService } from '../resolver/rback-details-by-id.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      breadcrumb: 'RBAC Config - Application'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    component: ListComponent,
    // resolve: {
    //   applicationList: ApplicationListResolverService
    // },
    data: {
      breadcrumb: ' RBAC List - Application'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      breadcrumb: ' RBAC List - Application'
    },
    canActivate: [AuthGuard]
  },

  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      resolveRbacById: RbackDetailsByIdService
    },
    data: {
      breadcrumb: ' RBAC Configuration - Edit'
    },
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RbacRoutingModule {}
