import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../container/list/list.component';
import { AddComponent } from '../container/add/add.component';
import { EditComponent } from '../container/edit/edit.component';
import { EntityResolverService } from '../resolver/entity-resolver.service';
import { EntityByIdResolverService } from '../resolver/entity-by-id-resolver.service';
import { ListDetailsComponent } from '../container/list-details/list-details.component';
import { EntityMetadataByIdResolverService } from '../resolver/entity-metadata-by-id-resolver.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      resolveEntityList: EntityResolverService
    },
    data: {
      breadcrumb: 'Device List'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'list-details/:id',
    component: ListDetailsComponent,
    resolve: {
      resolveEntityMetaDataList: EntityMetadataByIdResolverService
    },
    data: {
      breadcrumb: 'Device List'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddComponent,
    resolve: {
      resolveEntityList: EntityResolverService
    },
    data: {
      breadcrumb: 'Add Entity'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      resolveEntityList: EntityResolverService,
      resolveEntityById: EntityByIdResolverService
    },
    data: {
      breadcrumb: 'Edit Entity'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule {}
