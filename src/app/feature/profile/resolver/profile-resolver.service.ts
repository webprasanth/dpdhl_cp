import { Injectable, Inject } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';

@Injectable({
    providedIn: 'root'
})

export class ProfileResolverService implements Resolve<any> {
    constructor(private _profileService: ProfileService,
        @Inject(SESSION_STORAGE) private storage: StorageService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        let userProfileId = this.storage.get('userId');
        return this._profileService.getProfileUserById(userProfileId);
    }
}
