import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './component/app.component';
import { FeatureModule } from '../feature/feature.module';
import { CoreModule } from '../core/core.module';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdalService, AdalGuard } from 'adal-angular4';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from './services/app.service';
import { AutoLogoutService } from './services/auto-logout.service'
import { AppInsightService } from './services/app-insight.service';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import {
  SimpleNotificationsModule,
  NotificationsService
} from 'angular2-notifications';
import { TreeviewModule } from 'ngx-treeview';
import { TreeModule } from 'angular-tree-component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FeatureModule,
    SharedModule,
    CoreModule.forRoot(),
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    TreeviewModule.forRoot(),
    TreeModule.forRoot()
  ],
  providers: [AdalService, AdalGuard, AppService, AppInsightService, AutoLogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
