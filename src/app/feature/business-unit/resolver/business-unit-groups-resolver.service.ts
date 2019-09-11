import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { BusinessUnitService } from '../services/business-unit.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitGroupsResolverService implements Resolve<any> {
  constructor(private _businessUnitService: BusinessUnitService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._businessUnitService.getBUGroups();
  }
}
