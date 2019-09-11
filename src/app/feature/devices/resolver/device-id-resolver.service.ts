import { Injectable } from '@angular/core';

import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DeviceService } from '../services/device.service';
@Injectable({
  providedIn: 'root'
})
export class DeviceIdResolverService {
  constructor(private _deviceService: DeviceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get('id');
    if (id == '0') {
      return null;
    } else {
      return this._deviceService.getDeviceById(id);
    }
  }
}
