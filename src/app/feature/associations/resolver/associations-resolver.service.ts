import { Injectable, Inject } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AssociationsService } from '../services/associations.service';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AdalService } from 'adal-angular4';

@Injectable({
  providedIn: 'root'
})
export class AssociationsResolverService implements Resolve<any> {
  constructor(
    private _associationsService: AssociationsService,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let param = {
      userRole: this.storage.get('UserRole'),
      userID: this.storage.get('userId'),
      userEmailID: this._adalService.userInfo.userName
    };
    return this._associationsService.getTopLevelEntities(param);
  }
}
