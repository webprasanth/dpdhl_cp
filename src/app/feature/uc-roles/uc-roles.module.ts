import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UcComponent } from './components/uc/uc.component';
import { UcRolesRoutingModule } from './router/uc-roles-routing.module';

@NgModule({
  declarations: [UcComponent],
  imports: [
    CommonModule,
    UcRolesRoutingModule
  ]
})
export class UcRolesModule { }
