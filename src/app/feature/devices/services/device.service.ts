import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceConstant } from '../constants/devices-contants';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private axiosClient: AxiosInstance;
  constructor(private _httpClient: HttpClient) {
    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        // "X-Initialized-At": Date.now().toString(),

        'X-User-Email': 'biswaranjan.sethi@wipro.com',
        'X-User-Token': 'fbIDYVdsQIGQ8RWOP-DW',
        'X-User-Project': 'Paqsyu9dQwOsCjTqdnpV8w'
      }
    });
  }
  getAllDevices(): Observable<any> {
    return this._httpClient.get<any>(DeviceConstant.API_DEVICELIST);
  }

  createDevice(params): Observable<any> {
    return this._httpClient.post<any>(DeviceConstant.API_CREATEDEVICE, params);
  }
  getDeviceById(id): Observable<any> {
    return this._httpClient.get<any>(DeviceConstant.API_DEVICEBYID + id);
  }
  updateDevice(params): Observable<any> {
    return this._httpClient.patch<any>(DeviceConstant.API_UPDATEDEVICE, params);
  }
  deleteDevice(params): Observable<any> {
    let httpParams = new HttpParams().set('id', params);
    let options = { params: httpParams };
    return this._httpClient.delete<any>(
      DeviceConstant.API_DEVICEDELETE + params
    );
  }
  deleteGroupDevice(params): Observable<any> {
    return this._httpClient.delete<any>(
      DeviceConstant.API_DEVICEGROUPDELETE + params
    );
  }
  bulkUpload(params): Observable<any> {
    return this._httpClient.post<any>(DeviceConstant.API_DEVICEUPLOAD, params);
  }

  getEntityList(): Observable<any> {
    return this._httpClient.get<any>(DeviceConstant.API_GETENTITY);
  }

  checkDeviceExist(params): Observable<any> {
    return this._httpClient.post<any>(
      DeviceConstant.API_CHECKDEVICEEXIST,
      params
    );
  }

  getChildEntityList(id): Observable<any> {
    return this._httpClient.get<any>(DeviceConstant.API_GETCHILDENTITY + id);
  }

  createDeviceGroup(param): Observable<any> {
    return this._httpClient.post<any>(
      DeviceConstant.API_CREATEDEVICEGROUP,
      param
    );
  }

  createDeviceGroupOnboard(param): Observable<any> {
    return this._httpClient.post<any>(DeviceConstant.API_ONBOARDDEVICE, param);
  }

  getDevicesByType(): Observable<any> {
    return this._httpClient.get<any>(DeviceConstant.API_GETDEVICESBYTYPE);
  }

  getServiceProvider(): Observable<any> {
    return this._httpClient.get<any>(DeviceConstant.API_GETSERVICEPROVIDER);
  }

  getDevicesByDeviceType(id): Observable<any> {
    let param = {
      deviceTypeID: id
    };
    return this._httpClient.post<any>(
      DeviceConstant.CONST_GETDEVICESBYDEVICETYPE,
      param
    );
  }

  getDevicesByGroupId(id): Observable<any> {
    let param = {
      deviceGroupID: id
    };
    return this._httpClient.post<any>(
      DeviceConstant.CONST_GETDEVICESBYGROUPID,
      param
    );
  }

  getDeviceGroups(params): Observable<any> {
    return this._httpClient.post<any>(
      DeviceConstant.API_GETDEVICEGROUP,
      params
    );
  }

  getDevicesByAPI(param): Observable<any> {
    return this._httpClient.post<any>('devices/getDevicesFromSigFox', param);
  }

  public async get<T>(options): Promise<T> {
    try {
      var axiosResponse = await this.axiosClient.request<T>({
        method: 'get',
        url: `https://dhl.rpplabs.com/api/trackable_objects/`
      });

      return axiosResponse.data;
    } catch (error) {
      // return( Promise.reject( this.normalizeError( error ) ) );
      return null;
    }
  }

  getGithubData() {
    axios
      .get(`https://dhl.rpplabs.com/api/trackable_objects/`, {
        headers: {
          'X-User-Email': 'biswaranjan.sethi@wipro.com',
          'X-User-Token': 'fbIDYVdsQIGQ8RWOP-DW',
          'X-User-Project': 'Paqsyu9dQwOsCjTqdnpV8w'
        }
      })
      .then(res => {
        console.log(res.data.login);
      });
  }

  getTrackables(param) {
    try {
      const allTrackablesData = axios.get(
        `https://dhl.rpplabs.com/api/trackable_objects/`,
        {
          headers: {
            'X-User-Email': 'biswaranjan.sethi@wipro.com',
            'X-User-Token': 'fbIDYVdsQIGQ8RWOP-DW',
            'X-User-Project': 'Paqsyu9dQwOsCjTqdnpV8w'
          }
        }
      );
      // const allTrackables = [];
      // debugger;
      // allTrackablesData['data']['trackableObjects'].forEach(elem => {
      //   allTrackables.push({
      //     uid: elem.uid,
      //     groups: elem.groups,
      //     label: elem.name
      //   });
      // });
      return allTrackablesData;
    } catch (e) {
      throw new Error(e);
    }
  }

  getOnAssetDevices(): Observable<any> {
    return this._httpClient.get<any>(DeviceConstant.API_DEVICEONASSET);
  }

  getNFCDevices(param): Observable<any> {
    return this._httpClient.post<any>(DeviceConstant.API_DEVICENFC, param);
  }

  getRoamBeeDevices(param): Observable<any> {
    return this._httpClient.post<any>(DeviceConstant.API_DEVICEROAMBEE, param);
  }
}
