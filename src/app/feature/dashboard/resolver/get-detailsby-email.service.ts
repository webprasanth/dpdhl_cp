import { Injectable } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdalService } from 'adal-angular4';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsbyEmailService {
  constructor(private _dashboardService: DashboardService, private _adalService: AdalService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._dashboardService.getAllApplicationByEmail(this._adalService.userInfo.userName);
  }
}
