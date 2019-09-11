import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { DeviceService } from '../services/device.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityResolverService implements Resolve<any> {
  constructor(private _deviceService: DeviceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._deviceService.getEntityList();
  }
}
