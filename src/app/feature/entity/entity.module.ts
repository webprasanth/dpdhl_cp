import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './container/list/list.component';
import { AddComponent } from './container/add/add.component';
import { EditComponent } from './container/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import { EntityRoutingModule } from './router/entity-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { EntityService } from './services/entity.service';
import { EntityResolverService } from './resolver/entity-resolver.service';
import { EntityByIdResolverService } from './resolver/entity-by-id-resolver.service';
import { ListDetailsComponent } from './container/list-details/list-details.component';
import { EntityMetadataByIdResolverService } from './resolver/entity-metadata-by-id-resolver.service';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    DetailsComponent,
    ListDetailsComponent
  ],
  imports: [
    CommonModule,
    EntityRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  providers: [
    EntityService,
    EntityResolverService,
    EntityByIdResolverService,
    EntityMetadataByIdResolverService
  ]
})
export class EntityModule {}
