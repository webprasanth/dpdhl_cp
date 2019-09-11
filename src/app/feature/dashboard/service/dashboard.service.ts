import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardConstants } from '../constants/dashboard.constants';
import { DashboardComponent } from 'src/app/feature/dashboard/container/dashboard/dashboard.component';
import { _MatChipListMixinBase } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private _httpClient: HttpClient) { }

  getAllApplication(): Observable<any> {
    return this._httpClient.get<any>(DashboardConstants.API_ALLAPPLICATIONLIST);
  }

  getQuickLinks(params): Observable<any> {
    // return this._httpClient.get<any>(DashboardConstants.API_QUICKLINKS + email);
    return this._httpClient.post<any>(DashboardConstants.API_QUICKLINKSNEW, params);
  }
  getAllApplicationByEmail(email): Observable<any> {
    return this._httpClient.get<any>(
      DashboardConstants.API_ALLAPPLICATIONLISTBYEMAIL + email
    );
  }
  updateFavoriteApp(params): Observable<any> {
    return this._httpClient.post<any>(
      DashboardConstants.API_UPDATEFAVORITE,
      params
    );
  }
  getAppOwner(): Observable<any> {
    return this._httpClient.get<any>(DashboardConstants.API_APPOWNER);
  }
  sendEmail(params): Observable<any> {
    return this._httpClient.post<any>('email/sendEmail', params);
  }
  updateUserLastLogin(params): Observable<any> {
    let userID = {
      userID: params
    }
    return this._httpClient.post<any>(DashboardConstants.API_APPLASTLOGIN, userID);
  }
  getUserDestributionData(params): Observable<any> {
    return this._httpClient.post<any>(
      DashboardConstants.API_USERGRAPH_DATA, params);
  }
  getDeviceDestributionData(params): Observable<any> {
    return this._httpClient.post<any>(
      DashboardConstants.API_DEVICEGRAPH_DATA, params
    );
  }
}
