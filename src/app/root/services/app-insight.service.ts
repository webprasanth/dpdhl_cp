import { Injectable } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';
// import * as decode from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { AdalService } from 'adal-angular4';

@Injectable({
  providedIn: 'root'
})
export class AppInsightService {
  private config: Microsoft.ApplicationInsights.IConfig = {
    instrumentationKey: environment.appInsights.instrumentationKey
  };
  constructor(private _adalService: AdalService) {
    if (!AppInsights.config) {
      AppInsights.downloadAndSetup(this.config);
      // If you want to log UserId in metrices
      // Logic to get logged in User
      var user = this._adalService.userInfo.userName;
      AppInsights.setAuthenticatedUserContext(user);
    }
  }
  logPageView(
    name?: string,
    url?: string,
    properties?: any,
    measurements?: any,
    duration?: number
  ) {
    AppInsights.trackPageView(name, url, properties, measurements, duration);
  }
  logEvent(name: string, properties?: any, measurements?: any) {
    AppInsights.trackEvent(name, properties, measurements);
  }
  logException(
    exception: Error,
    handledAt?: string,
    properties?: any,
    measurements?: any
  ) {
    AppInsights.trackException(exception, handledAt, properties, measurements);
  }
  logTrace(message: string, properties?: any, severityLevel?: any) {
    AppInsights.trackTrace(message, properties, severityLevel);
  }
}
