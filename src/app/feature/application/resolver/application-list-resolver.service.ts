import { Injectable, Inject } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AdalService } from 'adal-angular4';
@Injectable()
export class ApplicationListResolverService implements Resolve<any> {
  constructor(private _applicationService: ApplicationService,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let params = {
      'userRole': this.storage.get('UserRole'),
      'userEmailID': this._adalService.userInfo.userName
    }
    return this._applicationService.getApplication(params);
  }
}
