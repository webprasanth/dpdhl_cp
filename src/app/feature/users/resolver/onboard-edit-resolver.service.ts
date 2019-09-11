import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardEditResolverService implements Resolve<any> {
  constructor(private _userService: UsersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get('id');
    let param = {
      orgID: id
    };
    if (id !== '0') {
      return this._userService.getUserGroupById(id);
    } else {
      return null;
    }
  }
}
