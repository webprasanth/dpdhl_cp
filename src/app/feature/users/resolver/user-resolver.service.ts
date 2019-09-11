import { Injectable, Inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AdalService } from 'adal-angular4';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {
  constructor(private _userService: UsersService,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let params = {
      'userRole': this.storage.get('UserRole'),
      'userEmailID': this._adalService.userInfo.userName
    }
    return this._userService.getAllUsers(params);
  }
}
