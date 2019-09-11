import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationLogConstants } from '../constants/application-log-constants';

@Injectable({
  providedIn: 'root'
})
export class ApplicationLogService {
  constructor(private _httpClient: HttpClient) {}

  getLogs(): Observable<any> {
    return this._httpClient.get<any>(ApplicationLogConstants.API_LOGLIST);
  }
}
