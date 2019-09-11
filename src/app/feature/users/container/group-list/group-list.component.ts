import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { NotificationsService } from 'angular2-notifications';
import { UserConstant } from '../../constants/users-constants';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AdalService } from 'adal-angular4';

@Component({
  selector: 'dpdhl-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  userGroupList: any;
  displayedColumns: string[] = [
    'select',
    'user_group_name',
    'parent_name',
    'role_name',
    'is_exists',
    'created_by',
    'created_date',
    'action'
  ];
  showTable: false;
  popUpConfig: any = {
    title: 'User Group Delete Confirmation',
    rowOne: '',
    rowTwo: 'There are users exist, do you still want to delete user group?',
    rowThree:
      'Once you confirm, it will be deleted with all the respective association.'
  };
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'user_group_name',
    dataColumnOptions: UserConstant.dataColumnOptionsUserGroup,
    actionOptions: {
      edit: true,
      delete: true,
      view: true
    },
    exportExcel: true,
    exportExcelName: 'UsersGroupList.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  appUser: string;
  viewUserGroupPopup: boolean = false;
  userGroupdata: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsersService,
    private _notificationsService: NotificationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _adalService: AdalService
  ) {}

  ngOnInit() {
    this.appUser = this.storage.get('UserRole');
    this._route.data.subscribe(data => {
      this.userGroupList = data.resolveUserGroup.result;
      console.log(this.userGroupList);
    });
  }

  getUserGroupList() {
    let params = {
      userRole: this.storage.get('UserRole'),
      userEmailID: this._adalService.userInfo.userName
    };
    this._userService.getAllUserGroup(params).subscribe(res => {
      if (res) {
        this.userGroupList = res.result;
      }
    });
  }

  editUserGroup(event) {
    this._router.navigate(['/users/onboard/' + event]);
  }

  deleteUserGroup(id) {
    this._userService.deleteUserGroup(id).subscribe(res => {
      if (res) {
        this._notificationsService.success('User Group Deleted Successfully');
        this.getUserGroupList();
      }
    });
  }
  viewUserDetails(id) {
    this.viewUserGroupPopup = true;
    return this._userService.getUserGroupById(id).subscribe(data => {
      if (data) {
        this.userGroupdata = data.result[0];
      }
    });
  }
  closePopup(event) {
    this.viewUserGroupPopup = event;
  }
}
