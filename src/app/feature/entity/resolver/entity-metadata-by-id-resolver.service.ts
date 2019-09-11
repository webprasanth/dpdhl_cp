import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { EntityService } from '../services/entity.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityMetadataByIdResolverService implements Resolve<any> {
  constructor(private _entityService: EntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get('id');
    return this._entityService.getEntityMetaDataById(id);
  }
}
