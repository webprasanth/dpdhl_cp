import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociationsViewComponent } from './container/associations-view/associations-view.component';
import { AssociationsRoutingModule } from './router/associations-routing.module';
import { TreeModule } from 'angular-tree-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AssociationsViewComponent],
  imports: [
    CommonModule,
    AssociationsRoutingModule,
    TreeModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule
  ]
})
export class AssociationsModule {}
