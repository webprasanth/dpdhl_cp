import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './container/list/list.component';
import { AddComponent } from './container/add/add.component';
import { EditComponent } from './container/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import { UsersRoutingModule } from './router/users-routing.module';
import { UserResolverService } from './resolver/user-resolver.service';
import { UsersService } from './services/users.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnboardComponent } from './components/onboard/onboard.component';
import { UserOnboardingComponent } from './container/user-onboarding/user-onboarding.component';
import { MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserIdResolverService } from './resolver/user-id-resolver.service';
import { OnboardEditResolverService } from './resolver/onboard-edit-resolver.service';
import { ApplicationResolverService } from './resolver/application-resolver.service';
import { BusinessUnitResolverService } from './resolver/business-unit-resolver.service';
import { ViewComponent } from './components/view/view.component';
import { BulkUploadComponent } from './components/bulk-upload/bulk-upload.component';
import { ExtInviteComponent } from './container/ext-invite/ext-invite.component';
import { GroupListComponent } from './container/group-list/group-list.component';
import { ExternalComponent } from './components/external/external.component';
import { UserGroupResolverService } from './resolver/user-group-resolver.service';
import { GroupViewComponent } from './components/group-view/group-view.component';
@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    ViewComponent,
    DetailsComponent,
    OnboardComponent,
    UserOnboardingComponent,
    BulkUploadComponent,
    ExtInviteComponent,
    GroupListComponent,
    ExternalComponent,
    GroupViewComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserResolverService,
    UsersService,
    UserIdResolverService,
    OnboardEditResolverService,
    ApplicationResolverService,
    BusinessUnitResolverService,
    UserGroupResolverService
  ]
})
export class UsersModule {}
