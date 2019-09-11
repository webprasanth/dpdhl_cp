import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssociationsConstants } from '../constants/associations-constants';

@Injectable({
  providedIn: 'root'
})
export class AssociationsService {
  emptyResult = [];
  constructor(private _httpClient: HttpClient) {}

  getAssociations(): Observable<any> {
    return this._httpClient.get<any>(
      AssociationsConstants.API_ASSOCIATIONSLIST
    );
  }

  getAssociationEntity(id): Observable<any> {
    return this._httpClient.get<any>(
      AssociationsConstants.API_GETASSOCIATIONENTITY + '?entityID=' + id
    );
  }

  getUserGroups(id): Observable<any> {
    return this._httpClient.get<any>(
      AssociationsConstants.API_GETUSERSGROUP + id
    );
  }

  getAssociationsList(): Observable<any> {
    return this._httpClient.get<any>(AssociationsConstants.API_GETASSOCIATION);
  }

  getTopLevelEntities(param): Observable<any> {
    return this._httpClient.post<any>(
      AssociationsConstants.API_GETTOPLEVELENTITIES,
      param
    );
  }

  getAllBusinessUnits(): Observable<any> {
    return this._httpClient.get<any>(AssociationsConstants.API_BUALLLIST);
  }

  getChildEntity(param): Observable<any> {
    return this._httpClient.post<any>(
      AssociationsConstants.API_GETENTITYCHILDREN,
      param
    );
  }

  getAllAssociationByBU(param): Observable<any> {
    return this._httpClient.post<any>(
      AssociationsConstants.API_GETALLASSOCIATIONBYENTITY,
      param
    );
  }

  getAllUserGroups(param): Observable<any> {
    return this._httpClient.post<any>(
      AssociationsConstants.API_GETALLUSERGROUPS,
      param
    );
  }

  getAssociateGroup(param): Observable<any> {
    return this._httpClient.post<any>(
      AssociationsConstants.API_ASSOCIATEUSERGROUP,
      param
    );
  }

  getDeviceGroupNotAssociated(param): Observable<any> {
    return this._httpClient.post<any>(
      AssociationsConstants.API_GETDEVICEGROUPNOTASSOCIATED,
      param
    );
  }

  associateDeviceGroup(param): Observable<any> {
    return this._httpClient.post<any>(
      AssociationsConstants.API_ASSOCIATEDEVICEGROUP,
      param
    );
  }

  deAssociateEntity(param): Observable<any> {
    return this._httpClient.post<any>(
      AssociationsConstants.API_DEASSOCIATEENTITY,
      param
    );
  }

  getNotAssociatedApplication(): Observable<any> {
    return this._httpClient.get<any>(
      AssociationsConstants.API_GETNOTASSOCIATEDAPPLICATION
    );
  }

  associateApplication(param): Observable<any> {
    return this._httpClient.post<any>(
      AssociationsConstants.API_ASSOCIATEAPPLICATION,
      param
    );
  }

  getAllUsersByGroupId(id): Observable<any> {
    return this._httpClient.get<any>(
      AssociationsConstants.API_GETALLUSERSBYGROUP + id
    );
  }

  getAllDevicesByGroupId(id): Observable<any> {
    return this._httpClient.get<any>(
      AssociationsConstants.API_GETALLDEVICESBYGROUP + id
    );
  }
}
