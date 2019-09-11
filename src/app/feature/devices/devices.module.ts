import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './container/list/list.component';
import { AddComponent } from './container/add/add.component';
import { EditComponent } from './container/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import { DevicesRoutingModule } from './router/devices-routing.module';
import { DeviceService } from './services/device.service';
import { DeviceResolverService } from './resolver/device-resolver.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceIdResolverService } from './resolver/device-id-resolver.service';
import { BulkUploadComponent } from './components/bulk-upload/bulk-upload.component';
import { OnBoardComponent } from './components/on-board/on-board.component';
import { OnboardComponent } from './container/onboard/onboard.component';
import { MatSelectModule, MatCheckboxModule } from '@angular/material';
import { EntityResolverService } from './resolver/entity-resolver.service';
import { ListDetailsComponent } from './container/list-details/list-details.component';
import { ListDetailByIdResoverService } from './resolver/list-detail-by-id-resover.service';
import { GroupListComponent } from './container/group-list/group-list.component';
import { DeviceGroupListResolverService } from './resolver/device-group-list-resolver.service';
@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    DetailsComponent,
    BulkUploadComponent,
    OnBoardComponent,
    OnboardComponent,
    ListDetailsComponent,
    GroupListComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [
    DeviceService,
    DeviceResolverService,
    DeviceIdResolverService,
    EntityResolverService,
    ListDetailByIdResoverService,
    DeviceGroupListResolverService
  ]
})
export class DevicesModule {}
