import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './container/list/list.component';
import { DeviceConfigAddComponent } from './container/device-config-add/device-config-add.component';
import { DeviceConfigEditComponent } from './container/device-config-edit/device-config-edit.component';
import { DeviceConfigComponent } from './components/device-config/device-config.component';
import { ConfigurationRoutingModule } from './router/configuration-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigurationService } from './services/configuration.service';
import { ConfigurationResolverService } from './resolver/configuration-resolver.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceSpecIdResolverService } from './resolver/device-spec-id-resolver.service';

@NgModule({
  declarations: [
    ListComponent,
    DeviceConfigAddComponent,
    DeviceConfigEditComponent,
    DeviceConfigComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigurationService,
    ConfigurationResolverService,
    DeviceSpecIdResolverService
  ]
})
export class ConfigurationModule {}
