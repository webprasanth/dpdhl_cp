import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UcComponent } from '../components/uc/uc.component';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  { path: '', component: UcComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UcRolesRoutingModule {}
