import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationConstants } from '../constants/application.constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  editList = [];
  private editItems = new BehaviorSubject(this.editList);
  currentEditItems = this.editItems.asObservable();

  constructor(private _httpClient: HttpClient) { }

  getApplication(params): Observable<any> {
    return this._httpClient.post<any>(ApplicationConstants.API_APPLIST, params);
  }

  getApplicationById(id): Observable<any> {
    return this._httpClient.get<any>(ApplicationConstants.API_APPBYID + id);
  }

  createApplication(params): Observable<any> {
    return this._httpClient.post<any>(
      ApplicationConstants.API_APPCREATE,
      params
    );
  }

  updateApplication(params): Observable<any> {
    return this._httpClient.patch<any>(
      ApplicationConstants.API_APPUPDATE,
      params
    );
  }

  deleteApplication(params): Observable<any> {
    let httpParams = new HttpParams().set('id', params);

    let options = { params: httpParams };
    return this._httpClient.delete<any>(
      ApplicationConstants.API_APPDELETE + params
    );
  }

  getApplicationImg(params): Observable<any> {
    return this._httpClient.post<any>(ApplicationConstants.API_APPMAGE, params);
  }

  getResourceList(params): Observable<any> {
    return this._httpClient.get<any>(
      'https://management.azure.com/subscriptions/ed03d0f8-d22c-4c9d-b117-266f95c38df0/resourceGroups/' +
      params +
      '/resources?$expand=changedTime,createdTime&api-version=2019-05-10'
    );
  }

  getResourceGroup(): Observable<any> {
    return this._httpClient.get<any>(
      'https://management.azure.com/subscriptions/ed03d0f8-d22c-4c9d-b117-266f95c38df0/resourcegroups?&api-version=2018-05-01'
    );
  }

  updateEditItems(items: any) {
    this.editItems.next(items);
  }

  getBusinessUnit(): Observable<any> {
    return this._httpClient.get<any>(ApplicationConstants.API_BULIST);
  }

  searchBUUser(param): Observable<any> {
    return this._httpClient.get<any>(
      ApplicationConstants.API_SEARCHBUUSER + "?$filter=Mail eq '" + param + "'"
    );
  }
  getAllApplicationByEmail(email): Observable<any> {
    return this._httpClient.get<any>(
      ApplicationConstants.API_ALLAPPLICATIONLISTBYEMAIL + email
    );
  }

  updateFavoriteApp(params): Observable<any> {
    return this._httpClient.post<any>(
      ApplicationConstants.API_UPDATEFAVORITE,
      params
    );
  }
  bulkUpload(params): Observable<any> {
    return this._httpClient.post<any>(
      ApplicationConstants.API_APPUPLOAD,
      params
    );
  }

  createResourceGroup(name): Observable<any> {
    let param = { location: 'westeurope' };
    return this._httpClient.put<any>(
      'https://management.azure.com/subscriptions/ed03d0f8-d22c-4c9d-b117-266f95c38df0/resourcegroups/' +
      name +
      '?api-version=2019-05-10',
      param
    );
  }
}
