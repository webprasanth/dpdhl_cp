import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/utilities/authGuard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  {
    path: 'uc',
    loadChildren: './uc-roles/uc-roles.module#UcRolesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'application',
    loadChildren: './application/application.module#ApplicationModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'business-unit',
    loadChildren: './business-unit/business-unit.module#BusinessUnitModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'devices',
    loadChildren: './devices/devices.module#DevicesModule',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'notifications',
  //   loadChildren: './notifications/notifications.module#NotificationsModule',
  //   canActivate: [AuthGuard]
  // },
  { path: 'notifications', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'associations',
    loadChildren: './associations/associations.module#AssociationsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'logs',
    loadChildren:
      './application-log/application-log.module#ApplicationLogModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'entity',
    loadChildren: './entity/entity.module#EntityModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'rbac',
    loadChildren: './rbac/rbac.module#RbacModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'configuration',
    loadChildren: './configuration/configuration.module#ConfigurationModule',
    canActivate: [AuthGuard]
  }
];

export const FeatureRouting = RouterModule.forRoot(routes, {
  useHash: true,
  enableTracing: false
});
