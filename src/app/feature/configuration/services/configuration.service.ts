import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigurationConstants } from '../constants/configuration-contants';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  editList = [];
  private editItems = new BehaviorSubject(this.editList);
  currentEditItems = this.editItems.asObservable();
  constructor(private _httpClient: HttpClient) {}

  getDeviceSpecs(): Observable<any> {
    return this._httpClient.get<any>(ConfigurationConstants.API_GETDEVICESPEC);
  }

  getDeviceSpecById(id): Observable<any> {
    return this._httpClient.get<any>(
      ConfigurationConstants.API_GETDEVICESPECBYID + id
    );
  }

  createDeviceSpecs(param): Observable<any> {
    return this._httpClient.post<any>(
      ConfigurationConstants.API_CREATEDEVICESPEC,
      param
    );
  }

  updateDeviceSpecs(param): Observable<any> {
    return this._httpClient.patch<any>(
      ConfigurationConstants.API_UPDATEDEVICESPEC,
      param
    );
  }

  updateEditItems(items: any) {
    this.editItems.next(items);
  }
}
