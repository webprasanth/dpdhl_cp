import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './router/dashboard-routing.module';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { QuickViewComponent } from './components/quick-view/quick-view.component';
import { NewApplicationComponent } from './components/new-application/new-application.component';
import { UserGraphComponent } from './components/user-graph/user-graph.component';
import { AppOwnerComponent } from './components/app-owner/app-owner.component';
import { NvD3Module } from 'ng2-nvd3';
import { SharedModule } from './../../shared/shared.module';
import { ListComponent } from './container/list/list.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';
import { DeviceDistributionGraphComponent } from './components/device-distribution-graph/device-distribution-graph.component';
import { DeviceStatusComponent } from './components/device-status/device-status.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material'


@NgModule({
  declarations: [
    DashboardComponent,
    QuickViewComponent,
    NewApplicationComponent,
    UserGraphComponent,
    AppOwnerComponent,
    ListComponent,
    DeviceDistributionGraphComponent,
    DeviceStatusComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NvD3Module,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularEditorModule
  ]
})
export class DashboardModule { }
