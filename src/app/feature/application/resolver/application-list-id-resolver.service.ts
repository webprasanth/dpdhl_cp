import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationService } from '../services/application.service';

@Injectable()
export class ApplicationListIdResolverService implements Resolve<any> {
  constructor(private _applicationService: ApplicationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get('id');
    return this._applicationService.getApplicationById(id);
  }
}
