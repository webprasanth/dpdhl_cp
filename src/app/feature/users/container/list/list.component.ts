import { Component, OnInit, Inject } from '@angular/core';
import { IUsersList } from '../../model/users-model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UserConstant } from '../../constants/users-constants';
import { NotificationsService } from 'angular2-notifications';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AdalService } from 'adal-angular4';
@Component({
  selector: 'dpdhl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  componentRoles;
  ListRoles;
  privilages;
  role;
  appUser;
  userListView;
  displayedColumns: string[] = [
    'select',
    'first_name',
    'email_id',
    'user_group_name',
    'business_unit',
    'application_name',
    'action'
  ];
  showTable: false;
  popUpConfig: any = {
    title: 'User Delete Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to delete user details?',
    rowThree:
      'Once you confirm, it will be deleted with all the respective association.'
  };
  popUpVisibility: boolean = false;
  fileUploadMessage: boolean = false;
  viewUserPopup: boolean = false;
  userAppdata: any;

  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  userList: Array<IUsersList>;
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'first_name',
    dataColumnOptions: UserConstant.dataColumnOptions,
    actionOptions: {
      edit: true,
      delete: true,
      view: true
    },
    exportExcel: true,
    exportExcelName: 'UsersList.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsersService,
    private _adalService: AdalService,
    private _notificationsService: NotificationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.userList = data.resolveUserList.result;
    });
    /***********privilages******* */
    this.privilages = this.storage.get('privileges');

    this.componentRoles = this.serchPrivilage('user');
    this.role = this.componentRoles[0].rights[0];

    this.configuration.exportExcel = this.role.export;
    this.configuration.actionOptions = {
      edit: this.role.edit,
      delete: this.role.delete,
      view: true
    };

    this.appUser = this.storage.get('UserRole');
    if (this.appUser == 'Default App User Role') {
      this.userListView = true;
    }
    /****************************** */
  }
  serchPrivilage(searchName) {
    return this.privilages[0].filter(obj => {
      return obj.role == searchName;
    });
  }

  getAllUsers() {
    let params = {
      userRole: this.storage.get('UserRole'),
      userEmailID: this._adalService.userInfo.userName
    };
    this._userService.getAllUsers(params).subscribe(res => {
      if (res) {
        this.userList = res.result;
      }
    });
  }
  deleteUser(id) {
    if (id.length > 1) {
      var finalArray = id.map(function (obj) {
        return obj.id;
      });
      for (var i = 0; i < finalArray.length; i++) {
        this._userService.deleteUser(finalArray[i]).subscribe(res => {
          if (res) {
            this.getAllUsers();
            this.popUpVisibility = true;
          }
        });
      }
      this._notificationsService.success(UserConstant.User_Deleted_Message);
    } else {
      this._userService.deleteUser(id).subscribe(res => {
        if (res) {
          this.getAllUsers();
          this.popUpVisibility = true;
          this._notificationsService.success(UserConstant.User_Deleted_Message);
        }
      });
    }
  }

  editUser(id) {
    if (id.length > 1) {
      var finalArray = id.map(function (obj) {
        return obj.id;
      });
      this._userService.updateEditItems(finalArray);
      this._router.navigate(['/users/edit/', finalArray[0]]);
    } else {
      this._router.navigate(['/users/edit/', id]);
    }
  }
  viewUserDetails(id) {
    this.viewUserPopup = true;
    return this._userService.getUserById(id).subscribe(data => {
      if (data) {
        this.userAppdata = data.result[0];
      }
    });
  }
  closePopup(event) {
    this.viewUserPopup = event;
  }
}
