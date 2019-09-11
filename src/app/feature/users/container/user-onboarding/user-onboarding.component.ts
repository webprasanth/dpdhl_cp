import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AdalService } from 'adal-angular4';
import { UserConstant } from '../../constants/users-constants';
import { NotificationsService } from 'angular2-notifications';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'dpdhl-user-onboarding',
  templateUrl: './user-onboarding.component.html',
  styleUrls: ['./user-onboarding.component.scss']
})
export class UserOnboardingComponent implements OnInit {
  buList: any;
  childEntity: any;
  BUHeadStatus: boolean = false;
  emailData: any;
  successWindow: boolean = false;
  errorMessage = false;
  userGroupExist = false;
  userGroupAvailable = false;
  groupNameExists: any = {
    disableProperty: true,
    errorMsg: false
  };
  editOnboard: any;
  invitationNotAccepted: boolean = false;
  inviteUserPopup: boolean = false;

  userOnboardData: any = {
    userGroupID: null,
    userGroupName: '',
    oldParentID: null,
    oldParentType: null,
    parentID: null,
    parentName: '',
    parentType: '',
    grandParentID: null,
    grandParentName: '',
    grandParentType: '',
    isParentIsEntity: true,
    createdBy: '',
    users: [],
    appID: 0,
    buID: 0
  };
  parentEntity;
  buSession;
  appSession;
  bulkUploadStatus: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _usersService: UsersService,
    private _adalService: AdalService,
    private _router: Router,
    private _notificationsService: NotificationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {
    this.userOnboardData.createdBy = this._adalService.userInfo.userName;
  }

  ngOnInit() {
    if (this.storage.get('parentEntity')) {
      this.parentEntity = this.storage.get('parentEntity');
      this.storage.remove('parentEntity');
      this.userOnboardData.parentID = this.parentEntity.id;
      this.userOnboardData.parentName = this.parentEntity.name;
      this.userOnboardData.parentType = this.parentEntity.type;
    } else {
      this.parentEntity = '';
    }
    if (this.storage.get('appID')) {
      this.appSession = this.storage.get('appID');
      this.storage.remove('appID');
      this.userOnboardData.appID = this.appSession;
    } else {
      this.appSession = '';
    }
    if (this.storage.get('buID')) {
      this.buSession = this.storage.get('buID');
      this.storage.remove('buID');
      this.userOnboardData.buID = this.buSession;
    } else {
      this.buSession = '';
    }
    this._route.data.subscribe(data => {
      if (
        data &&
        data.resolveEditOnboard &&
        data.resolveEditOnboard.result &&
        data.resolveEditOnboard.result.length > 0
      ) {
        this.editOnboard = data.resolveEditOnboard.result[0];
        this.userOnboardData.userGroupID = this.editOnboard.user_group_id;
        this.userOnboardData.userGroupName = this.editOnboard.user_group_name;
        this.userOnboardData.users = this.editOnboard.users;
        this.userOnboardData.parentID = this.editOnboard.parent_id;
        this.userOnboardData.parentName = this.editOnboard.parent_name;
        this.userOnboardData.parentType = this.editOnboard.parent_type;
        this.userOnboardData.appID = this.editOnboard.app_id;
        this.userOnboardData.buID = this.editOnboard.bu_id;
      } else {
        this.editOnboard = null;
      }
    });
  }

  selectedBUValue(value) {
    let param = {
      orgID: value.id,
      type: 'Business Unit'
    };
    this._usersService.getImmediateChild(param).subscribe(res => {
      this.childEntity = res.result;
    });
  }

  selectedChildValue(value) {
    let param = {
      orgID: value.id,
      type: value.name
    };
    this._usersService.getImmediateChild(param).subscribe(res => {
      this.childEntity = res.result;
    });
  }

  verifyRegisterEmail(email) {
    this._usersService.searchEmail(email).subscribe(
      res => {
        if (res && res.value && res.value.length == 0) {
          this.emailData = '';
          this.BUHeadStatus = true;
          this.invitationNotAccepted = false;
        } else if (
          (res &&
            res.value &&
            res.value.length == 1 &&
            res.value[0].externalUserState == 'Accepted') ||
          res.value[0].userType == 'Member'
        ) {
          this.emailData = res.value[0];
          this.BUHeadStatus = false;
          this.invitationNotAccepted = false;
        } else if (
          res &&
          res.value &&
          res.value.length == 1 &&
          res.value[0].externalUserState == 'PendingAcceptance'
        ) {
          this.invitationNotAccepted = true;
        } else {
          this.emailData = res.value[0];
          this.BUHeadStatus = true;
          this.invitationNotAccepted = false;
        }
      },
      error => {
        this.emailData = '';
      }
    );
  }

  searchUserGroupName(name) {
    this._usersService.verifyUserGroup(name).subscribe(res => {
      if (res && res.result.length > 0) {
        this.groupNameExists = {
          disableProperty: true,
          errorMsg: true
        };
      } else {
        this.groupNameExists = {
          disableProperty: false,
          errorMsg: false
        };
      }
    });
  }

  createUserGroup(data) {
    // var userList = [];
    // for (var i = 0; i < data.users.length; i++) {
    //   let obj = {
    //     firstname: data.users[i].displayName,
    //     email: data.users[i].mail,
    //     createdBy: this._adalService.userInfo.profile.given_name
    //   };
    //   userList.push(obj);
    // }
    // if (!data.appID || data.appID == ' ') {
    //   data.appID = null;
    // }
    // let param = {
    //   buID: data.businessUnit.id,
    //   appID: data.appID,
    //   userGroups: [
    //     {
    //       userGroupID: data.newGroup == '' ? null : data.newGroup,
    //       userGroupName: data.groupName,
    //       createdBy: this._adalService.userInfo.profile.given_name,
    //       users: userList
    //     }
    //   ]
    // };
    // console.log(data);
    this._usersService.createNewUserGroup(data).subscribe(res => {
      if (res) {
        // this.successWindow = true;
        if (data && data.userGroupID == null && data.parentID == null) {
          this._notificationsService.success(UserConstant.User_Message);
          this._router.navigate(['users/group-list']);
        } else if (data && data.userGroupID == null && data.parentID > 0) {
          this._notificationsService.success(UserConstant.User_Message);
          this._router.navigate(['associations']);
        } else {
          this._notificationsService.success('User group updated successfully');
          this._router.navigate(['users/group-list']);
        }
      }
    });
  }

  inviteExternalUser(form) {
    let param = {
      invitedUserDisplayName: form.displayName,
      invitedUserLastName: '',
      invitedUserMailNickName: '',
      invitedUserMobilePhone: null,
      invitedUserEmailAddress: form.emailId,
      sendInvitationMessage: true,
      inviteRedirectUrl: 'https://alphageek.azurewebsites.net/#/home',
      inviteRedeemUrl: 'https://alphageek.azurewebsites.net/#/home'
    };
    this._usersService.inviteExternalUser(param).subscribe(res => {
      if (res) {
        this.inviteUserPopup = false;
      } else {
        this.inviteUserPopup = true;
      }
    });
  }
  uploadBulkUser(data) {
    let paramsAllUser = {
      userRole: this.storage.get('UserRole'),
      userEmailID: this._adalService.userInfo.userName
    };
    this._usersService.getAllUserGroup(paramsAllUser).subscribe(res => {
      let index = res.result.findIndex(
        val => val.user_group_name == data.data[0].userGroupName
      );
      if (index > -1) {
        this._notificationsService.error('UserGroup is already Exist');
      } else {
        let param = {
          userGroupID: '',
          userGroupName: data.data[0].userGroupName,
          createdBy: '',
          users: data.data
        };
        this._usersService.bulkUpload(param).subscribe(
          res => {
            if (res) {
              if (res.result.errorCount > 1) {
                this.errorMessage = true;
                console.log('res.....', res.result.errors[0].errors);
              } else {
                this.userGroupExist = false;
                this._notificationsService.success(
                  UserConstant.User_Bulkupload_Message
                );
              }

              this._router.navigate(['/users']);
            } else {
              this.errorMessage = true;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  findUserGroup(groupName) {
    let params = {
      userRole: this.storage.get('UserRole'),
      userEmailID: this._adalService.userInfo.userName
    };
    this._usersService.getAllUserGroup(params).subscribe(res => {
      let index = res.result.findIndex(val => val.user_group_name == groupName);
      if (index > -1) {
        this.userGroupExist = true;
        this._notificationsService.error('UserGroup is already Exist');
        this.userGroupAvailable = false;
        this.bulkUploadStatus = false;
      } else {
        this.userGroupAvailable = true;
        this.userGroupExist = false;
        this.bulkUploadStatus = true;
      }
    });
  }
}
