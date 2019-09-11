import { Injectable, Inject } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DeviceService } from '../services/device.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AdalService } from 'adal-angular4';

@Injectable()
export class DeviceGroupListResolverService {
  constructor(private _deviceService: DeviceService, private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let params = {
      'userRole': this.storage.get('UserRole'),
      'userEmailID': this._adalService.userInfo.userName
    }
    return this._deviceService.getDeviceGroups(params);
  }
}
