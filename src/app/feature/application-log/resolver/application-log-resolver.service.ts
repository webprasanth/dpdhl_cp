import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ApplicationLogService } from '../service/application-log.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationLogResolverService implements Resolve<any> {
  constructor(private _applicationLogs: ApplicationLogService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._applicationLogs.getLogs();
  }
}
