import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ConfigurationService } from '../services/configuration.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceSpecIdResolverService implements Resolve<any> {
  constructor(private _configurationService: ConfigurationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get('id');
    return this._configurationService.getDeviceSpecById(id);
  }
}
