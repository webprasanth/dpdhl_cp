import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailsComponent } from './../container/profile-details/profile-details.component';
import { ProfileResolverService } from '../resolver/profile-resolver.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailsComponent,
    resolve: {
      resolveMyProfile: ProfileResolverService
    },
    data: {
      breadcrumb: 'Users'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
