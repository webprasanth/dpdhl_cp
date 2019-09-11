import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './container/list/list.component';
import { AddComponent } from './container/add/add.component';
import { EditComponent } from './container/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import { BusinessUnitRoutingModule } from './router/business-unit-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusinessUnitService } from './services/business-unit.service';
import { BusinessUnitIdResolverService } from './resolver/business-unit-id-resolver.service';
import { SharedModule } from './../../shared/shared.module';
import { BusinessUnitResolverService } from './resolver/business-unit-resolver.service';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { BusinessUnitGroupsResolverService } from './resolver/business-unit-groups-resolver.service';

@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    BusinessUnitRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [
    BusinessUnitService,
    BusinessUnitResolverService,
    BusinessUnitIdResolverService,
    BusinessUnitGroupsResolverService
  ]
})
export class BusinessUnitModule {}
