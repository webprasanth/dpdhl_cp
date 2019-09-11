import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationResolverService {

  constructor(private _notificationService: NotificationService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._notificationService.getAlerts();
  }
}

