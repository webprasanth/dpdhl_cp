import { Injectable } from '@angular/core';
import { DeviceService } from '../services/device.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceResolverService {
  constructor(private _deviceService: DeviceService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._deviceService.getDevicesByType();
  }
}
