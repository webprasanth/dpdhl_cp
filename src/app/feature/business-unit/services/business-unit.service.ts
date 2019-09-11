import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BusinessUnitConstants } from '../constants/business-unit.constants';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {
  editList = [];
  private editItems = new BehaviorSubject(this.editList);
  currentEditItems = this.editItems.asObservable();

  constructor(private _httpClient: HttpClient) {}

  getApps(): Observable<any> {
    return this._httpClient.get<any>(BusinessUnitConstants.API_BULIST);
  }

  getBusinessUnit(): Observable<any> {
    return this._httpClient.get<any>(BusinessUnitConstants.API_BULIST);
  }

  getBusinessUnitById(id): Observable<any> {
    return this._httpClient.get<any>(BusinessUnitConstants.API_BUBYID + id);
  }

  createBusinessUnit(params): Observable<any> {
    return this._httpClient.post<any>(
      BusinessUnitConstants.API_BUCREATE,
      params
    );
  }

  updateBusinessUnit(params): Observable<any> {
    return this._httpClient.patch<any>(
      BusinessUnitConstants.API_BUUPDATE,
      params
    );
  }

  deleteBusinessUnit(params): Observable<any> {
    let httpParams = new HttpParams().set('id', params);

    let options = { params: httpParams };
    return this._httpClient.delete<any>(
      BusinessUnitConstants.API_BUDELETE + params
    );
  }

  getBusinessUnitImage(params): Observable<any> {
    return this._httpClient.post<any>(
      BusinessUnitConstants.API_BUIMAGE,
      params
    );
  }

  getAllBusinessUnits(): Observable<any> {
    return this._httpClient.get<any>(BusinessUnitConstants.API_BUALLLIST);
  }

  searchBUUser(param): Observable<any> {
    return this._httpClient.get<any>(
      BusinessUnitConstants.API_SEARCHBUUSER +
        "?$filter=Mail eq '" +
        param +
        "'"
    );
  }

  getBUGroups(): Observable<any> {
    return this._httpClient.get<any>(BusinessUnitConstants.API_GETBUGROUPS);
  }

  updateEditItems(items: any) {
    this.editItems.next(items);
  }
}
