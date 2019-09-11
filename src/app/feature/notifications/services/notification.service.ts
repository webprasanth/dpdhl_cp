import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { NotificationConstants } from '../constants/notifications-constants';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _httpClient: HttpClient) { }

  getNotificationList(): Observable<any> {
    return this._httpClient.get<any>(NotificationConstants.API_NOTIFICATIONLIST);
  }
  getAlerts(): Observable<any> {
    return this._httpClient.get<any>(NotificationConstants.API_ALERTS);
  }
}
