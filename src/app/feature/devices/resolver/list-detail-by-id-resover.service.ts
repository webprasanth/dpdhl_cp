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
export class ListDetailByIdResoverService {
  constructor(private _deviceService: DeviceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get('id');
    return this._deviceService.getDevicesByGroupId(id);
  }
}
