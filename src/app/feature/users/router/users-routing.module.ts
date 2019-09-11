import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../container/list/list.component';
import { AddComponent } from '../container/add/add.component';
import { EditComponent } from '../container/edit/edit.component';
import { UserResolverService } from '../resolver/user-resolver.service';
import { UserOnboardingComponent } from '../container/user-onboarding/user-onboarding.component';
import { BusinessUnitResolverService } from '../resolver/business-unit-resolver.service';
import { UserIdResolverService } from '../resolver/user-id-resolver.service';
import { OnboardEditResolverService } from '../resolver/onboard-edit-resolver.service';
import { ApplicationResolverService } from '../resolver/application-resolver.service';
import { ExtInviteComponent } from '../container/ext-invite/ext-invite.component';
import { GroupListComponent } from '../container/group-list/group-list.component';
import { UserGroupResolverService } from '../resolver/user-group-resolver.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      resolveUserList: UserResolverService
    },
    data: {
      breadcrumb: 'Users List'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      breadcrumb: 'Add User'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'onboard/:id',
    component: UserOnboardingComponent,
    resolve: {
      resolveEditOnboard: OnboardEditResolverService
    },
    data: {
      breadcrumb: 'User Onboarding'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      resolveUsedId: UserIdResolverService
    },
    data: {
      breadcrumb: 'Edit User'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'ext-invite',
    component: ExtInviteComponent,
    data: {
      breadcrumb: 'Invite External User'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'group-list',
    component: GroupListComponent,
    resolve: {
      resolveUserGroup: UserGroupResolverService
    },
    data: {
      breadcrumb: 'Group List User'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
