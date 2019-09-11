import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserConstant } from '../constants/users-constants';

@Injectable({ providedIn: 'root' })
export class UsersService {
  editList = [];
  private editItems = new BehaviorSubject(this.editList);
  currentEditItems = this.editItems.asObservable();

  constructor(private _httpClient: HttpClient) { }

  getAllUsers(params): Observable<any> {
    return this._httpClient.post<any>(UserConstant.API_USERLIST, params);
  }

  getUserById(param): Observable<any> {
    return this._httpClient.get<any>(UserConstant.API_USERUSERBYID + param);
  }

  getAllBUList(): Observable<any> {
    return this._httpClient.get<any>(UserConstant.API_BULIST);
  }

  getAllApplication(): Observable<any> {
    return this._httpClient.get<any>(UserConstant.API_APPLIST);
  }

  getImmediateChild(params): Observable<any> {
    return this._httpClient.post<any>(
      UserConstant.API_GETIMMEDIATECHILD,
      params
    );
  }

  getUserGroupById(id): Observable<any> {
    return this._httpClient.get<any>(UserConstant.API_GETUSERSGROUPBYID + id);
  }

  searchEmail(param): Observable<any> {
    return this._httpClient.get<any>(
      UserConstant.API_SEARCHBUUSER + "?$filter=Mail eq '" + param + "'"
    );
  }

  createNewUserGroup(param): Observable<any> {
    return this._httpClient.post<any>(
      UserConstant.API_CREATENEWUSERGROUP,
      param
    );
  }

  verifyUserGroup(param): Observable<any> {
    return this._httpClient.get<any>(UserConstant.API_CHECKUSERGROUP + param);
  }
  deleteUser(params): Observable<any> {
    let httpParams = new HttpParams().set('id', params);
    let options = {
      params: httpParams
    };
    return this._httpClient.delete<any>(UserConstant.API_USERDELETE + params);
  }
  deleteUserGroup(params): Observable<any> {
    return this._httpClient.delete<any>(
      UserConstant.API_DELETEUSERSGROUPBYID + params
    );
  }
  updateUser(params): Observable<any> {
    return this._httpClient.patch<any>(UserConstant.API_USERUPDATE, params);
  }
  updateEditItems(items: any) {
    this.editItems.next(items);
  }

  inviteExternalUser(param): Observable<any> {
    return this._httpClient.post<any>(
      'https://graph.microsoft.com/beta/invitations',
      param
    );
  }
  bulkUpload(params): Observable<any> {
    return this._httpClient.post<any>(UserConstant.API_USERUPLOAD, params);
  }
  getAllUserGroup(params): Observable<any> {
    return this._httpClient.post<any>(UserConstant.API_USERGROUPLIST, params);
  }
}
