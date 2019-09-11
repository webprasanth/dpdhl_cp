import { Injectable } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdalService } from 'adal-angular4';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApplicationAllListService {
  constructor(private _applicationService: ApplicationService, private _adalService: AdalService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._applicationService.getAllApplicationByEmail(this._adalService.userInfo.userName);
  }
}
