import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import { NotificationsService } from 'angular2-notifications';
import { EntityConstants } from '../../constants/entity-constants';
import { AdalService } from 'adal-angular4';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  entityList: any;
  childEntityList: any;
  treeViewRoot: any;
  defaultFormData: any = {
    createdBy: '',
    modifiedBy: '',
    entityID: null,
    entityMetadata: '',
    entityName: '',
    entityType: '',
    grandParentID: null,
    grandParentName: '',
    grandParentType: '',
    isParentIsEntity: false,
    isShareable: true,
    parentID: null,
    parentName: '',
    parentType: ''
  };
  entityFlow: string = 'add';

  constructor(
    private _route: ActivatedRoute,
    private _entityService: EntityService,
    private _notificationService: NotificationsService,
    private _router: Router,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        this.entityList = data.resolveEntityList.result;
      }
    });
    this.defaultFormData.createdBy = this._adalService.userInfo.userName;
  }

  getChildEntityById(event) {
    this._entityService.getChildEntityList(event.id).subscribe(res => {
      this.childEntityList = res.result;
    });
    let param = {
      entityID: event.id,
      entityType: event.entity_type,
      entityName: event.entity_name
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
    });
  }
}
