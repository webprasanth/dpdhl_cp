import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityConstants } from '../constants/entity-constants';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  constructor(private _httpClient: HttpClient) {}

  getEntityList(): Observable<any> {
    return this._httpClient.get<any>(EntityConstants.API_GETENTITY);
  }

  getChildEntityList(id): Observable<any> {
    return this._httpClient.get<any>(EntityConstants.API_GETCHILDENTITY + id);
  }

  createEntity(param): Observable<any> {
    return this._httpClient.post<any>(EntityConstants.API_CREATEENTITY, param);
  }

  getEntityById(id): Observable<any> {
    return this._httpClient.get<any>(EntityConstants.API_ENTITYBYID + id);
  }

  getEntityMetaDataById(id): Observable<any> {
    return this._httpClient.get<any>(
      EntityConstants.API_GETENTITYMETABYID + id
    );
  }

  getEntityParent(param): Observable<any> {
    return this._httpClient.post<any>(EntityConstants.API_GETROOTENTITY, param);
  }

  updateEntity(param): Observable<any> {
    return this._httpClient.post<any>(EntityConstants.API_UPDATEENTITY, param);
  }

  deleteEntity(param): Observable<any> {
    return this._httpClient.post<any>(EntityConstants.API_DELETEENTITY, param);
  }
}
