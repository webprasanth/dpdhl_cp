import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitListResolverService implements Resolve<any> {
  constructor(private _applicationService: ApplicationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._applicationService.getBusinessUnit();
  }
}
