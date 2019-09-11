import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BusinessUnitService } from '../services/business-unit.service';
import { Observable } from 'rxjs';

@Injectable()
export class BusinessUnitIdResolverService implements Resolve<any> {
  constructor(private _businessUnitService: BusinessUnitService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get('id');
    return this._businessUnitService.getBusinessUnitById(id);
  }
}
