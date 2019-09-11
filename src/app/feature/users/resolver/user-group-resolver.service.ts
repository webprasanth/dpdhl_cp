import { Injectable, Inject } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AdalService } from 'adal-angular4';
@Injectable({
  providedIn: 'root'
})
export class UserGroupResolverService implements Resolve<any> {
  constructor(private _userService: UsersService, private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let params = {
      'userRole': this.storage.get('UserRole'),
      'userEmailID': this._adalService.userInfo.userName
    }
    return this._userService.getAllUserGroup(params);
  }
}
