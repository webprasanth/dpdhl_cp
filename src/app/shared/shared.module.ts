import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NavbarLeftComponent } from './components/navbar-left/navbar-left.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MatGridComponent } from './components/mat-grid/mat-grid.component';

import {
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule
} from '@angular/material';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { FilterPipe } from './pipe/filter-pipe';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { AgeValidatorDirective } from './directives/age-validator.directive';
import { ChractersOnlyDirective } from './directives/chracters-only.directive';
import { SortPipe } from './pipe/sort.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotificationsComponent,
    NavbarLeftComponent,
    ClickOutsideDirective,
    BreadcrumbComponent,
    MatGridComponent,
    PopUpComponent,
    AlertsComponent,
    FilterPipe,
    NumberOnlyDirective,
    AgeValidatorDirective,
    ChractersOnlyDirective,
    SortPipe

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotificationsComponent,
    NavbarLeftComponent,
    ClickOutsideDirective,
    BreadcrumbComponent,
    MatGridComponent,
    PopUpComponent,
    AlertsComponent,
    FilterPipe,
    NumberOnlyDirective,
    AgeValidatorDirective,
    ChractersOnlyDirective,
    SortPipe
  ]
})
export class SharedModule { }
