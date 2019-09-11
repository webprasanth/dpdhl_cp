import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
// import { IGraph } from '../../models/dashboard.models';
import { DashboardConstants } from '../../constants/dashboard.constants';
import { AdalService } from 'adal-angular4';
import { DashboardService } from '../../service/dashboard.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'dpdhl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userToken: string;
  quickLinksCount: any;
  APPOwnerList: any;
  APPData: any;
  UserName: any;
  userId: any;
  totalDevice: any;
  userDestributionGraphDataList: any;
  deviceDestributionGraphDataList: any;
  dashboardRoles;
  graphRoles;
  allAppRoles;
  leftNavigationRoles;
  appOwnerRoles;
  componentRoles;
  privilages;
  role;
  userRole;

  appRoles;
  appprivilages;
  appIcon = false;

  businessRoles;
  businessprivilages;
  businessIcon = false;

  deviceRoles;
  deviceprivilages;
  deviceIcon = false;

  userRoles;
  userprivilages;
  userIcon = false;

  appuserRole;
  appOwnerList = false;

  invitedUser: boolean = false;
  defaultDate: any = {
    fromDate: '',
    toDate: ''
  };
  timer: number = 10;
  userData;
  constructor(
    private _adalService: AdalService,
    private _dashboardService: DashboardService,
    private _router: Router,
    private _route: ActivatedRoute,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        this.userData = data.resolveByEmail.result;
        if (data.resolveByEmail.result[0]) {
          this.UserName = data.resolveByEmail.result[0].firstname;
          this.userId = data.resolveByEmail.result[0].id;
          this.APPData = data.resolveByEmail.result[0].applications;
          this.storage.set('userId', this.userId);
          this._dashboardService
            .updateUserLastLogin(this.userId)
            .subscribe(res => {
              if (res) {
              }
            });
          this.storage.set(
            'privileges',
            data.resolveByEmail.result[0].privileges
          );
          this.storage.set('UserRole', data.resolveByEmail.result[0].role_name);
          this.userRole = data.resolveByEmail.result[0].role_name;
          this.getQuickLinks();
          this.getApplicationDetails();
          this.getAppOwner();
        } else {
          this.invitedUser = true;
          setInterval(() => {
            this.timer--;
            if (this.timer == 0) {
              this.timer = 0;
              this._adalService.logOut();
            }
          }, 1000);
        }
      }
    });
    // if (this.storage.get('reload') == undefined) {
    //   this.storage.set('reload', true);
    // }
    // if (this.storage.get('reload') == true) {
    //   this.storage.set('reload', false);
    //   console.log(this.storage.get('reload'));
    //   location.reload();
    // }
    /**** Roles***** */
    this.appuserRole = this.storage.get('UserRole');

    if (this.appuserRole == 'Platform Admin') {
      this.appOwnerList = true;
    }
    if (this._adalService.userInfo.authenticated) {
      this.userToken = this._adalService.userInfo.token;
    }

    let date1 = new Date();
    this.defaultDate.fromDate = this.formatDate(
      date1.setDate(date1.getDate() - 30)
    );
    this.defaultDate.toDate = this.formatDate(new Date());
    this.getUserDestributionChart(this.defaultDate);
    this.getDeviceDestributionChart(this.defaultDate);
    /***********privilages******* */

    this.privilages = this.storage.get('privileges');

    this.appprivilages = this.serchPrivilage('application');
    this.appRoles = this.appprivilages[0].rights[0];

    this.businessprivilages = this.serchPrivilage('business_Unit');
    this.businessRoles = this.businessprivilages[0].rights[0];

    this.deviceprivilages = this.serchPrivilage('device');
    this.deviceRoles = this.deviceprivilages[0].rights[0];

    this.userprivilages = this.serchPrivilage('user');
    this.userRoles = this.userprivilages[0].rights[0];

    if (this.appuserRole == 'Platform Admin') {
      this.appOwnerList = true;
    }
    if (
      this.businessRoles.business_unit_list_view ||
      this.businessRoles.delete ||
      this.businessRoles.edit ||
      this.businessRoles.export ||
      this.businessRoles.onboard_business_unit
    ) {
      this.businessIcon = true;
    }
    if (
      this.appRoles.application_list_view ||
      this.appRoles.delete ||
      this.appRoles.edit ||
      this.appRoles.export ||
      this.appRoles.onboard_application
    ) {
      this.appIcon = true;
    }
    if (
      this.deviceRoles.device_list_view ||
      this.deviceRoles.delete ||
      this.deviceRoles.edit ||
      this.deviceRoles.export ||
      this.deviceRoles.onboard_device
    ) {
      this.deviceIcon = true;
    }
    if (
      this.userRoles.user_list_view ||
      this.userRoles.delete ||
      this.userRoles.edit ||
      this.userRoles.export ||
      this.userRoles.onboard_user
    ) {
      this.userIcon = true;
    }

    /****************************** */
  }

  ngChanges() {
    this._route.data.subscribe(data => {
      if (data) {
        this.userData = data.resolveByEmail.result;
        if (data.resolveByEmail.result[0]) {
          this.storage.set(
            'privileges',
            data.resolveByEmail.result[0].privileges
          );
          this.storage.set('UserRole', data.resolveByEmail.result[0].role_name);
          this.userRole = data.resolveByEmail.result[0].role_name;
          this.getQuickLinks();
          this.getApplicationDetails();
          this.getAppOwner();
        }
      }
    });
    /**** Roles***** */
    this.appuserRole = this.storage.get('UserRole');

    if (this.appuserRole == 'Platform Admin') {
      this.appOwnerList = true;
    }
    if (this._adalService.userInfo.authenticated) {
      this.userToken = this._adalService.userInfo.token;
    }

    let date1 = new Date();
    this.defaultDate.fromDate = this.formatDate(
      date1.setDate(date1.getDate() - 30)
    );
    this.defaultDate.toDate = this.formatDate(new Date());
    /***********privilages******* */

    this.privilages = this.storage.get('privileges');

    this.appprivilages = this.serchPrivilage('application');
    this.appRoles = this.appprivilages[0].rights[0];

    this.businessprivilages = this.serchPrivilage('business_Unit');
    this.businessRoles = this.businessprivilages[0].rights[0];

    this.deviceprivilages = this.serchPrivilage('device');
    this.deviceRoles = this.deviceprivilages[0].rights[0];

    this.userprivilages = this.serchPrivilage('user');
    this.userRoles = this.userprivilages[0].rights[0];

    if (this.appuserRole == 'Platform Admin') {
      this.appOwnerList = true;
    }
    if (
      this.businessRoles.business_unit_list_view ||
      this.businessRoles.delete ||
      this.businessRoles.edit ||
      this.businessRoles.export ||
      this.businessRoles.onboard_business_unit
    ) {
      this.businessIcon = true;
    }
    if (
      this.appRoles.application_list_view ||
      this.appRoles.delete ||
      this.appRoles.edit ||
      this.appRoles.export ||
      this.appRoles.onboard_application
    ) {
      this.appIcon = true;
    }
    if (
      this.deviceRoles.device_list_view ||
      this.deviceRoles.delete ||
      this.deviceRoles.edit ||
      this.deviceRoles.export ||
      this.deviceRoles.onboard_device
    ) {
      this.deviceIcon = true;
    }
    if (
      this.userRoles.user_list_view ||
      this.userRoles.delete ||
      this.userRoles.edit ||
      this.userRoles.export ||
      this.userRoles.onboard_user
    ) {
      this.userIcon = true;
    }
    if (this.appuserRole) {
      this.getUserDestributionChart(this.defaultDate);
      this.getDeviceDestributionChart(this.defaultDate);
    }
    /****************************** */
  }
  serchPrivilage(searchName) {
    return this.privilages[0].filter(obj => {
      return obj.role == searchName;
    });
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  getQuickLinks() {
    let params = {
      userRole: this.userRole,
      userEmailID: this._adalService.userInfo.userName
    };
    this._dashboardService.getQuickLinks(params).subscribe(res => {
      this.quickLinksCount = res.result;
    });
  }
  getAppOwner() {
    this._dashboardService.getAppOwner().subscribe(res => {
      if (res) {
        this.APPOwnerList = res.result;
      }
    });
  }
  getApplicationDetails() {
    this._dashboardService
      .getAllApplicationByEmail(this._adalService.userInfo.userName)
      .subscribe(res => {
        if (res) {
          if (res.result[0]) {
            this.UserName = res.result[0].firstname;
            this.userId = res.result[0].id;
            this.APPData = res.result[0].applications;
            this.storage.set('userId', this.userId);
            this._dashboardService
              .updateUserLastLogin(this.userId)
              .subscribe(res => {
                if (res) {
                }
              });
          } else {
            this.invitedUser = true;
            setInterval(() => {
              this.timer--;
              if (this.timer == 0) {
                this.timer = 0;
                this._adalService.logOut();
              }
            }, 1000);
          }
        }
      });
  }

  onFavoritSelect(appDetails) {
    let detail = appDetails;
    appDetails.isFavorite = !appDetails.isFavorite;
    let params = {
      userID: this.userId,
      appID: appDetails.appID,
      isFavorite: appDetails.isFavorite
    };
    this._dashboardService.updateFavoriteApp(params).subscribe(res => {
      if (res) {
        let appName = detail.appName;
        let message = !detail.isFavorite
          ? 'removed from favorite application'
          : 'added to favorite application';
        this._notificationsService.success(appName + ' ' + message);
      }
    });
  }

  postEmail(emailParams) {
    this._dashboardService.sendEmail(emailParams).subscribe(res => {
      if (res) {
      }
    });
  }
  getUserDestributionChart(event) {
    let params = {
      userRole: this.appuserRole,
      userEmailID: this._adalService.userInfo.userName,
      fromDate: event.fromDate,
      toDate: event.toDate
    };
    this._dashboardService.getUserDestributionData(params).subscribe(res => {
      if (
        res.result[0].app_user_counts &&
        res.result[0].app_user_counts != null
      ) {
        this.userDestributionGraphDataList = res.result[0].app_user_counts;
      } else {
        this.userDestributionGraphDataList = [];
      }
      // else if (res.result[0].app_device_counts) {
      //   this.userDestributionGraphDataList = res.result[0].app_device_counts;
      // }
    });
  }
  getDeviceDestributionChart(dateParams) {
    let params = {
      userRole: this.storage.get('UserRole'),
      userEmailID: this._adalService.userInfo.userName,
      fromDate: dateParams.fromDate,
      toDate: dateParams.toDate
    };
    this._dashboardService.getDeviceDestributionData(params).subscribe(res => {
      if (
        res.result[0].app_device_counts &&
        res.result[0].app_device_counts != null
      ) {
        this.deviceDestributionGraphDataList = res.result[0].app_device_counts;
        this.totalDevice = res.result[0].total_count;
      } else {
        this.deviceDestributionGraphDataList = [];
        this.totalDevice = 0;
      }
    });
  }
}
