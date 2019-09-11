import { Component, OnInit, Inject } from '@angular/core';
import { EntityConstants } from '../../constants/entity-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import { NotificationsService } from 'angular2-notifications';
import { AdalService } from 'adal-angular4';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'dpdhl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  componentRoles;
  privilages;
  role;
  appUser;

  displayedColumns: string[] = [
    'select',
    'entity_name',
    'parent_name',
    'created_by',
    'created_date',
    'is_exists',
    'action'
  ];
  entityList: Array<any>;
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'entity_name',
    dataColumnOptions: EntityConstants.dataColumnOptions,
    actionOptions: {
      edit: true,
      view: true,
      delete: true
    },
    exportExcel: true,
    exportExcelName: 'Entity.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };

  popUpConfig: any = {
    title: 'Entity Delete Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to delete Entity details?',
    rowThree:
      'Once you confirm, it will be deleted with all the respective association.'
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _entityService: EntityService,
    private _notificationsService: NotificationsService,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        this.entityList = data.resolveEntityList.result;
      }
    });
    /***********privilages******* */
    this.privilages = this.storage.get('privileges');
    this.componentRoles = this.serchPrivilage('entities');
    this.role = this.componentRoles[0].rights[0];

    this.configuration.exportExcel = this.role.export;
    this.configuration.actionOptions = {
      edit: this.role.edit,
      delete: this.role.delete
    };

    this.appUser = this.storage.get('UserRole');

    /****************************** */
  }
  serchPrivilage(searchName) {
    return this.privilages[0].filter(obj => {
      return obj.role == searchName;
    });
  }

  editEntity(id) {
    this._router.navigate(['/entity/edit/', id]);
  }

  viewEntity(id) {
    this._router.navigate(['/entity/list-details/', id]);
  }

  deleteEntity(event) {
    let selected = this.entityList.find(val => {
      return val.id == event;
    });
    let param = {
      entityID: selected.id,
      entityName: selected.entity_name,
      entityType: selected.entity_type,
      modifiedBy: this._adalService.userInfo.userName
    };
    this._entityService.deleteEntity(param).subscribe(res => {
      this.getEntityList();
      this._notificationsService.success('Entity successfully delete');
    });
  }

  getEntityList() {
    this._entityService.getEntityList().subscribe(res => {
      this.entityList = res.result;
    });
  }
}
