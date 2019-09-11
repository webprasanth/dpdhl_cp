import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociationsViewComponent } from '../container/associations-view/associations-view.component';
import { AssociationsResolverService } from '../resolver/associations-resolver.service';
import { AuthGuard } from './../../../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AssociationsViewComponent,
    resolve: {
      resolveAssociationsList: AssociationsResolverService
    },
    data: {
      breadcrumb: 'Associations'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationsRoutingModule {}
