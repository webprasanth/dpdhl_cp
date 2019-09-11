import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private _httpClient: HttpClient) { }

  getMicrosoftToken(): Observable<any> {
    return this._httpClient.get<any>(AppConstants.API_GETTOKENRESOURCE);
  }

  getTokenBU(): Observable<any> {
    return this._httpClient.get<any>(AppConstants.API_GETTOKENBU);
  }

  getAllMenu(): Observable<any> {
    return this._httpClient.get<any>(AppConstants.API_MENU);
  }
  getAppOwner(): Observable<any> {
    return this._httpClient.get<any>(AppConstants.API_APPOWNER);
  }
  getNotificationList(): Observable<any> {
    return this._httpClient.get<any>(AppConstants.API_NOTIFICATIONLIST);
  }
  getAllApplicationByEmail(email): Observable<any> {
    return this._httpClient.get<any>(
      AppConstants.API_ALLAPPLICATIONLISTBYEMAIL + email
    );
  }
  getAlerts(): Observable<any> {
    return this._httpClient.get<any>(AppConstants.API_ALERTS);
  }
}
