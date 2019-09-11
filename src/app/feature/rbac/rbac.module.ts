import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RbacRoutingModule } from './router/rbac-router.module';
import { RbacService } from './services/rbac.service';
import { SharedModule } from './../../shared/shared.module';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { ApplicationComponent } from './container/application/application.component';
import { ListComponent } from './container/list/list.component';
import { RoleMappingComponent } from './container/role-mapping/role-mapping.component';
import { EditComponent } from './container/edit/edit.component';

import { DetailsComponent } from './component/details/details.component';
import { AddComponent } from './container/add/add.component';
import { RbackDetailsByIdService } from './resolver/rback-details-by-id.service';
import { ViewComponent } from './component/view/view.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    ListComponent,
    RoleMappingComponent,
    EditComponent,
    DetailsComponent,
    AddComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RbacRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [RbackDetailsByIdService]
})
export class RbacModule {}
