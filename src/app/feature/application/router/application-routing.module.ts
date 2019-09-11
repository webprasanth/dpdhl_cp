import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../container/list/list.component';
import { ApplicationListResolverService } from '../resolver/application-list-resolver.service';
import { AllAppComponent } from '../container/all-app/all-app.component';
import { FavoriteApplicationComponent } from '../container/favorite-application/favorite-application.component';
import { AddComponent } from '../container/add/add.component';
import { EditComponent } from '../container/edit/edit.component';
import { BusinessUnitListResolverService } from '../resolver/business-unit-list-resolver.service';
import { ResourceGroupResolverService } from '../resolver/resource-group-resolver.service';
import { ApplicationListIdResolverService } from '../resolver/application-list-id-resolver.service';
import { ApplicationAllListService } from '../resolver/application-all-list.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      applicationList: ApplicationListResolverService
    },
    data: {
      breadcrumb: 'Application List'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      breadcrumb: 'Add Application'
    },
    resolve: {
      resolveBusinessUnit: BusinessUnitListResolverService,
      resolveResourceGroup: ResourceGroupResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      breadcrumb: 'Edit Application'
    },
    resolve: {
      resolveApplicationById: ApplicationListIdResolverService,
      resolveBusinessUnit: BusinessUnitListResolverService,
      resolveResourceGroup: ResourceGroupResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'all',
    component: AllAppComponent,
    data: {
      breadcrumb: 'All Application'
    },
    resolve: {
      resolveAllApplication: ApplicationAllListService,
      resolveBusinessUnit: BusinessUnitListResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'favorite',
    component: FavoriteApplicationComponent,
    data: {
      breadcrumb: 'Favorite Application'
    },
    resolve: {
      resolveAllApplication: ApplicationAllListService,
      resolveBusinessUnit: BusinessUnitListResolverService
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
