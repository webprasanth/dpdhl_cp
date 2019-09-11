import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RbacConstants } from '../constants/rbac.constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RbacService {
  constructor(private _httpClient: HttpClient) {}
  getRbacConfigList(): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_RBACONFIGCLIST);
  }
  getUserGroups(): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_USERGROUP);
  }
  getUserGroupsEdit(param): Observable<any> {
    return this._httpClient.post<any>(
      RbacConstants.API_USERGROUPEDITNOTASSOCIATED,
      param
    );
  }
  saveConfig(params): Observable<any> {
    return this._httpClient.post<any>(RbacConstants.API_SAVECONFIG, params);
  }
  getRbackById(id): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_RBACBYID + id);
  }

  getApplication(params): Observable<any> {
    return this._httpClient.post<any>(RbacConstants.API_APPLIST, params);
  }
  getRbacList(params): Observable<any> {
    return this._httpClient.post<any>(RbacConstants.API_RBACLIST, params);
  }
  getRoles(param): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_ROLES + param);
  }
  getResponsibility(param): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_RESPONSIBILITY + param);
  }
  getRolesById(id): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_ROLESID + id);
  }
  getResponsibilityById(id): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_RESPONSIBILITYID + id);
  }
  addRoles(params): Observable<any> {
    return this._httpClient.post<any>(RbacConstants.APP_CREATEROLES, params);
  }
  addResponsibility(params): Observable<any> {
    return this._httpClient.post<any>(
      RbacConstants.API_ADDRESPONSIBILITY,
      params
    );
  }
  addSubFunction(params): Observable<any> {
    return this._httpClient.post<any>(RbacConstants.API_ADDSUBFUNCTION, params);
  }

  getTopLevelEntities(): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_TOPENTITIES);
  }
  getUserGroup(id): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_ASSOCIATEDUSER + id);
  }
  getRoleMapping(id): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_ROLEMAP + id);
  }
  getConfiguredRoles(): Observable<any> {
    return this._httpClient.get<any>(RbacConstants.API_CONFIGUREDROLES);
  }
  saveRoleMap(param): Observable<any> {
    return this._httpClient.post<any>(RbacConstants.API_SAVEROLE, param);
  }
  getPlatformbyId(params): Observable<any> {
    return this._httpClient.post<any>(RbacConstants.API_PLATFROMBYID, params);
  }

  deleteRbac(params): Observable<any> {
    let httpParams = new HttpParams().set('id', params);
    let options = { params: httpParams };
    return this._httpClient.delete<any>(RbacConstants.API_DELETERBAC + params);
  }
  getAllUserGroup(params): Observable<any> {
    return this._httpClient.post<any>(RbacConstants.API_USERGROUPLIST, params);
  }
}
