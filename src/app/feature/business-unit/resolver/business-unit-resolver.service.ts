import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessUnitService } from '../services/business-unit.service';

@Injectable()
export class BusinessUnitResolverService implements Resolve<any> {
  constructor(private _businessUnitService: BusinessUnitService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._businessUnitService.getBusinessUnit();
  }
}
