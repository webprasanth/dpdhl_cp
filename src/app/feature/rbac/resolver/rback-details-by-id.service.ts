import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { RbacService } from '../services/rbac.service';

@Injectable({
  providedIn: 'root'
})
export class RbackDetailsByIdService implements Resolve<any> {
  constructor(private _rbacService: RbacService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get('id');
    return this._rbacService.getRbackById(id);
  }
}
