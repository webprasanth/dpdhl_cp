import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { HomeRoutingModule } from './router/home-routing.module';
import { WhatIsIotComponent } from './component/what-is-iot/what-is-iot.component';
import { DpdhlAndIotComponent } from './component/dpdhl-and-iot/dpdhl-and-iot.component';
import { HowItWorksComponent } from './component/how-it-works/how-it-works.component';
import { BenefitsOfIotComponent } from './component/benefits-of-iot/benefits-of-iot.component';
import { TrackTraceComponent } from './component/track-trace/track-trace.component';
import { AssetMonitoringComponent } from './component/asset-monitoring/asset-monitoring.component';
import { CustomerSatisfactionComponent } from './component/customer-satisfaction/customer-satisfaction.component';
import { PredectiveMaintenanceComponent } from './component/predective-maintenance/predective-maintenance.component';
import { SmartEnergyComponent } from './component/smart-energy/smart-energy.component';
import { DataManagementComponent } from './component/data-management/data-management.component';
import { DeviceManagementComponent } from './component/device-management/device-management.component';
import { EventManagementComponent } from './component/event-management/event-management.component';
import { SecurityComponent } from './component/security/security.component';

@NgModule({
  declarations: [
    HomeComponent,
    WhatIsIotComponent,
    DpdhlAndIotComponent,
    HowItWorksComponent,
    BenefitsOfIotComponent,
    TrackTraceComponent,
    AssetMonitoringComponent,
    CustomerSatisfactionComponent,
    PredectiveMaintenanceComponent,
    SmartEnergyComponent,
    DataManagementComponent,
    DeviceManagementComponent,
    EventManagementComponent,
    SecurityComponent
  ],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
