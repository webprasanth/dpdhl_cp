import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProfileConstant } from '../constants/profile.constants';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  constructor(private _httpClient: HttpClient) {

  }
  getProfileUserById(param): Observable<any> {
    return this._httpClient.get<any>(ProfileConstant.API_USERPROFILE + param);
  }
  updateMyProfile(params): Observable<any> {
    return this._httpClient.patch<any>(
      ProfileConstant.API_USERPROFILEUPDATE,
      params
    );
  }

}
