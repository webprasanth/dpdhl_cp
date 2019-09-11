import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import { NotificationsService } from 'angular2-notifications';
import { EntityConstants } from '../../constants/entity-constants';
import { AdalService } from 'adal-angular4';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  entityList: any;
  selectedEntity: any;
  childEntityList: any;
  treeViewRoot: any;
  entityFlow: string = 'edit';

  constructor(
    private _route: ActivatedRoute,
    private _entityService: EntityService,
    private _notificationService: NotificationsService,
    private _router: Router,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        // this.selectedEntity = data.resolveEntityById.result[0];
        this.selectedEntity = {
          createdBy: data.resolveEntityById.result[0].createdby,
          entityID: data.resolveEntityById.result[0].entityid,
          entityMetadata: data.resolveEntityById.result[0].entitymetadata,
          entityName: data.resolveEntityById.result[0].entityname,
          entityType: data.resolveEntityById.result[0].entitytype,
          grandParentID: data.resolveEntityById.result[0].grandparentid,
          grandParentName: data.resolveEntityById.result[0].grandparentname,
          grandParentType: data.resolveEntityById.result[0].grandparenttype,
          isParentIsEntity: data.resolveEntityById.result[0].grandparentid
            ? true
            : false,
          isShareable: data.resolveEntityById.result[0].isshareable,
          parentID: data.resolveEntityById.result[0].parentid,
          parentName: data.resolveEntityById.result[0].parentname,
          parentType: data.resolveEntityById.result[0].parenttype,
          modifiedBy: this._adalService.userInfo.userName
        };
        this.entityList = data.resolveEntityList.result;
        // if (this.selectedEntity.grandParentID) {
        //   let event = {
        //     id: this.selectedEntity.grandParentID
        //   };
        //   this.getChildEntityById(event);
        // } else if (this.selectedEntity.parentID) {
        //   let event = {
        //     id: this.selectedEntity.parentID
        //   };
        //   this.getChildEntityById(event);
        // }
      }
    });
  }

  getChildEntityById(event) {
    this._entityService.getChildEntityList(event.id).subscribe(res => {
      this.childEntityList = res.result;
    });
    let index = this.entityList.findIndex(ind => ind.id == event.id);
    let param = {
      entityID: this.entityList[index].id,
      entityType: this.entityList[index].entity_type,
      entityName: this.entityList[index].entity_name
    };
    this._entityService.getEntityParent(param).subscribe(res => {
      this.treeViewRoot = res.result[0].assoc;
    });
  }

  entityForm(event) {
    this._entityService.createEntity(event).subscribe(res => {
      this._notificationService.success(
        EntityConstants.CONST_CREATEENTITYSUCCESS
      );
      this.storage.remove('parentEntity');
      this._router.navigate(['/associations']);
      // if (this.storage.get('AssociationEntity')) {
      //   this._router.navigate(['/associations']);
      // }
    });
  }
}
