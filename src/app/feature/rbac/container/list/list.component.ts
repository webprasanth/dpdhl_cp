import { Component, OnInit } from '@angular/core';
import { RbacService } from '../../services/rbac.service';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { RbacConstants } from '../../constants/rbac.constants';
import { IApplicationList } from '../../models/rback-models';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';

@Component({
  selector: 'dpdhl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  popUpConfig: any = {
    title: 'RBAC Delete Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to delete Rbck Configuration?',
    rowThree:
      'Once you confirm, it will be deleted with all the respective Configurations.'
  };
  popUpVisibility: boolean = false;
  fileUploadMessage: boolean = false;
  showTab = true;
  tabParams;
  appList;
  Roles;
  AppRoles;
  rbacView;
  viewData;
  userGroup = [];
  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  displayedColumns: string[] = [
    'select',
    'role_name',
    'user_group_name',
    'action'
  ];
  applicationList: Array<IApplicationList>;
  applicationPlatformList: Array<IApplicationList>;
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'name',
    dataColumnOptions: RbacConstants.dataColumnOptions,
    actionOptions: {
      edit: true,
      delete: true,
      view: true
    },
    exportExcel: false,
    exportExcelName: 'Application.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  constructor(
    private _rbacService: RbacService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notificationsService: NotificationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _adalService: AdalService
  ) {}

  ngOnInit() {
    this.getApplication();
  }
  getApplication() {
    this._rbacService.getRbacConfigList().subscribe(res => {
      if (res) {
        this.applicationPlatformList = res.result;
      }
    });
  }

  editRbac(id) {
    this._router.navigate(['/rbac/edit/', id]);
  }
  ViewRbac(id) {
    // this._router.navigate(['/rbac/edit/', id]);
    this.rbacView = true;
    this._rbacService.getRbackById(id).subscribe(res => {
      if (res) {
        this.viewData = res.result;
        this.getUserGroup();
      }
    });
  }

  deleteRbac(id) {
    this._rbacService.deleteRbac(id).subscribe(res => {
      if (res) {
        this.getApplication();
      }
    });
  }
  closePopup(event) {
    this.rbacView = event;
    this.userGroup = [];
  }
  getUserGroup() {
    let params = {
      userRole: this.storage.get('UserRole'),
      userEmailID: this._adalService.userInfo.userName
    };
    this._rbacService.getAllUserGroup(params).subscribe(res => {
      if (res) {
        this.viewData[0].user_group_ids.find(val => {
          res.result.find(usr => {
            if (usr.id == val) {
              this.userGroup.push(usr);
            }
          });
        });
      }
    });
  }
}
