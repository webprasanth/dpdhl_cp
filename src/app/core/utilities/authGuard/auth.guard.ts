import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdalService } from 'adal-angular4';
import { AD_CONFIG } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private adalService: AdalService) {
    this.adalService.init(AD_CONFIG);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.adalService.userInfo.authenticated) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
