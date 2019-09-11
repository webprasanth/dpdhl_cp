import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './container/list/list.component';
import { ApplicationRoutingModule } from './router/application-routing.module';
import { ApplicationService } from './services/application.service';
import { SharedModule } from './../../shared/shared.module';
import { ApplicationListResolverService } from './resolver/application-list-resolver.service';
import { ViewComponent } from './components/view/view.component';
import { ApplicationListIdResolverService } from './resolver/application-list-id-resolver.service';
import { AllAppComponent } from './container/all-app/all-app.component';
import { FavoriteApplicationComponent } from './container/favorite-application/favorite-application.component';
import { AddComponent } from './container/add/add.component';
import { EditComponent } from './container/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import { ResourceGroupResolverService } from './resolver/resource-group-resolver.service';
import { BusinessUnitListResolverService } from './resolver/business-unit-list-resolver.service';
import { MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BulkUploadComponent } from './components/bulk-upload/bulk-upload.component';
@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    AllAppComponent,
    FavoriteApplicationComponent,
    AddComponent,
    EditComponent,
    DetailsComponent,
    BulkUploadComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  providers: [
    ApplicationService,
    ApplicationListResolverService,
    ApplicationListIdResolverService,
    ResourceGroupResolverService,
    BusinessUnitListResolverService
  ]
})
export class ApplicationModule { }
