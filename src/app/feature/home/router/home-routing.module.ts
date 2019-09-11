import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../component/home/home.component';
import { WhatIsIotComponent } from '../component/what-is-iot/what-is-iot.component';
import { DpdhlAndIotComponent } from '../component/dpdhl-and-iot/dpdhl-and-iot.component';
import { BenefitsOfIotComponent } from '../component/benefits-of-iot/benefits-of-iot.component';
import { HowItWorksComponent } from '../component/how-it-works/how-it-works.component';
import { TrackTraceComponent } from '../component/track-trace/track-trace.component';
import { AssetMonitoringComponent } from '../component/asset-monitoring/asset-monitoring.component';
import { CustomerSatisfactionComponent } from '../component/customer-satisfaction/customer-satisfaction.component';
import { SmartEnergyComponent } from '../component/smart-energy/smart-energy.component';
import { PredectiveMaintenanceComponent } from '../component/predective-maintenance/predective-maintenance.component';
import { DataManagementComponent } from '../component/data-management/data-management.component';
import { DeviceManagementComponent } from '../component/device-management/device-management.component';
import { SecurityComponent } from '../component/security/security.component';
import { EventManagementComponent } from '../component/event-management/event-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'what-is-iot',
    component: WhatIsIotComponent
  },
  { path: 'dpdhl-and-iot', component: DpdhlAndIotComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'benefits', component: BenefitsOfIotComponent },
  { path: 'track-trace', component: TrackTraceComponent },
  { path: 'asset-monitoring', component: AssetMonitoringComponent },
  { path: 'customer-satisfaction', component: CustomerSatisfactionComponent },
  { path: 'predictive-maintenance', component: PredectiveMaintenanceComponent },
  { path: 'smart-energy', component: SmartEnergyComponent },
  { path: 'data-management', component: DataManagementComponent },
  { path: 'device-management', component: DeviceManagementComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'event-management', component: EventManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
