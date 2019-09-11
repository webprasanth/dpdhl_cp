import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DeviceService } from '../../services/device.service';
import { DeviceConstant } from '../../constants/devices-contants';
import { AdalService } from 'adal-angular4';
import axios from 'axios';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'dpdhl-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {
  onBoardType: string;
  serviceProvider: any;
  deviceGroupExist: any = false;
  deviceAPIList: any;
  displayedColumns: any = ['select'];
  sigfoxURL: string = '';
  tempDeviceList = [];
  deviceGroupAvailable: any = false;
  dataColumnOptions: any = [
    {
      title: 'Select',
      property: 'select',
      width: 50,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];
  deviceAPIListView: boolean = false;

  configuration: any = {
    rowList: [10, 20, 50],
    action: false,
    primaryKey: 'name',
    dataColumnOptions: this.dataColumnOptions,
    actionOptions: {
      edit: false,
      delete: false,
      setting: false
    },
    exportExcel: true,
    exportExcelName: 'DeviceMetaData.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  deviceFormData: any;
  serviceProviderURL: any;

  constructor(
    private _route: ActivatedRoute,
    private _deviceService: DeviceService,
    private _notificationService: NotificationsService,
    private _router: Router,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
    this.getServiceProvider();
    this._route.data.subscribe(data => {
      if (data.resolveDeviceID == null) {
        this.onBoardType = 'add';
        this.deviceFormData = {
          serviceProvider: '',
          serviceProviderID: null,
          deviceTypeName: '',
          deviceTypeNameID: null,
          deviceGroupID: null,
          deviceGroupName: '',
          createdBy: this._adalService.userInfo.userName,
          modifiedBy: this._adalService.userInfo.userName,
          deviceMetadata: '',
          newDeviceMetadata: '',
          removedDeviceMetadata: '',
          username: '',
          password: '',
          email: '',
          project: '',
          token: '',
          parentID: '',
          parentName: '',
          parentType: ''
        };
      } else {
        // for(var i = 0;i < data.resolveDeviceID)
        this.onBoardType = 'edit';
        this.deviceFormData = {
          serviceProvider: data.resolveDeviceID.result[0].service_provider,
          serviceProviderID: data.resolveDeviceID.result[0].service_provider_id,
          deviceTypeName: data.resolveDeviceID.result[0].device_type_name,
          deviceTypeNameID: data.resolveDeviceID.result[0].device_type_id,
          deviceGroupID: data.resolveDeviceID.result[0].device_group_id,
          deviceGroupName: data.resolveDeviceID.result[0].device_group_name,
          createdBy: this._adalService.userInfo.userName,
          modifiedBy: this._adalService.userInfo.userName,
          deviceMetadata: data.resolveDeviceID.result[0].devicemetadata,
          newDeviceMetadata: '',
          removedDeviceMetadata: '',
          username: data.resolveDeviceID.result[0].user_name,
          password: data.resolveDeviceID.result[0].password,
          email: data.resolveDeviceID.result[0].email,
          project: data.resolveDeviceID.result[0].project,
          token: data.resolveDeviceID.result[0].token,
          parentID: data.resolveDeviceID.result[0].parent_id,
          parentName: data.resolveDeviceID.result[0].parent_name,
          parentType: data.resolveDeviceID.result[0].parent_type
        };
      }
    });
  }

  deviceOnboardsubmit(event) {
    // console.log(event);
    let checkParam = {
      serviceProviderID: event.serviceProviderID,
      deviceMetadata:
        event.deviceGroupID == null
          ? event.deviceMetadata
          : event.newDeviceMetadata
    };
    this._deviceService.checkDeviceExist(checkParam).subscribe(res => {
      if (res && res.count > 0) {
        this._notificationService.error(
          'Selected Device already Assigned to a Group'
        );
      } else {
        this._deviceService.createDeviceGroupOnboard(event).subscribe(res => {
          if (event && event.deviceGroupID == null && event.parentID == '') {
            this._notificationService.success(
              DeviceConstant.CONST_CREATEDEVICESUCCESS
            );
            this._router.navigate(['/devices']);
          } else if (
            event &&
            event.deviceGroupID == null &&
            event.parentID > 0
          ) {
            this._notificationService.success(
              DeviceConstant.CONST_CREATEDEVICESUCCESS
            );
            this._router.navigate(['/associations']);
          } else {
            this._notificationService.success(
              'Device group updated successfully'
            );
            this._router.navigate(['/devices']);
          }
        });
      }
    });
  }

  getServiceProviderURL(event) {
    this.serviceProviderURL = event;
  }

  deviceByAPI(param) {
    var accToken = '';
    // if (param.url) {
    // debugger;
    // param.url = this.sigfoxURL;
    // }
    if (param.accessToken) {
      accToken = param;
    }
    // let param = {
    //   username: '5ca4a93fe833d97655ae1de1',
    //   password: '353a66754599d6a201eab14e6f401cb3'
    // };
    let respon;
    if (
      this.serviceProviderURL &&
      this.serviceProviderURL.service_provider == 'Sigfox'
    ) {
      this._deviceService.getDevicesByAPI(param).subscribe(
        res => {
          respon = res.result.paging.next;
          if (res.result.paging.next !== 'undefined') {
            param.url = res.result.paging.next;
            this.deviceByAPI(param);

            if (this.deviceAPIList && this.deviceAPIList.length == 0) {
              this.tempDeviceList.push(res.result.data);
            } else {
              let mapdata = res.result.data.map(obj => {
                this.tempDeviceList.push(obj);
              });
            }
          }
        },
        error => {
          if (respon !== 'undefined') {
            this.deviceAPIList = this.tempDeviceList;
            if (this.deviceAPIList.length > 0) {
              this.deviceAPIListView = true;
            } else {
              this.deviceAPIListView = false;
            }

            this.matGridCreation(this.deviceAPIList);
          } else {
            this._notificationService.error('Invalid Credentials');
          }
        }
      );
    } else if (
      this.serviceProviderURL &&
      this.serviceProviderURL.service_provider == 'RPP - Red Pointlabs Platform'
    ) {
      axios
        .get(this.serviceProviderURL.api_url, {
          headers: {
            'X-User-Email': param.email,
            'X-User-Token': param.token,
            'X-User-Project': param.project
          }
        })
        .then(res => {
          this.deviceAPIList = res.data.trackableObjects;
          if (this.deviceAPIList.length > 0) {
            this.deviceAPIListView = true;
          } else {
            this.deviceAPIListView = false;
          }
          this.matGridCreation(this.deviceAPIList);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (
      this.serviceProviderURL &&
      this.serviceProviderURL.service_provider == 'OnAsset'
    ) {
      this._deviceService.getOnAssetDevices().subscribe(res => {
        this.deviceAPIList = res.result;
        if (this.deviceAPIList.length > 0) {
          this.deviceAPIListView = true;
        } else {
          this.deviceAPIListView = false;
        }
        this.matGridCreation(this.deviceAPIList);
      });
    } else if (
      this.serviceProviderURL &&
      this.serviceProviderURL.service_provider == 'NFC'
    ) {
      this._deviceService.getNFCDevices(accToken).subscribe(res => {
        this.deviceAPIList = res.result;
        if (this.deviceAPIList.length > 0) {
          this.deviceAPIListView = true;
        } else {
          this.deviceAPIListView = false;
        }
        this.matGridCreation(this.deviceAPIList);
      });
    } else if (
      this.serviceProviderURL &&
      this.serviceProviderURL.service_provider == 'Roambee'
    ) {
      this._deviceService.getRoamBeeDevices(accToken).subscribe(res => {
        this.deviceAPIList = res.result;
        if (this.deviceAPIList.length > 0) {
          this.deviceAPIListView = true;
        } else {
          this.deviceAPIListView = false;
        }
        this.matGridCreation(this.deviceAPIList);
      });
    }
  }

  matGridCreation(data) {
    var myObject = data[0];
    var key;
    for (key in myObject) {
      if (typeof myObject[key] != 'object' || myObject[key] == null) {
        this.displayedColumns.push(key);
        let obj = {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          property: key,
          width: 150,
          visible: true,
          isNumber: false,
          isDate: false
        };
        this.dataColumnOptions.push(obj);
      }
    }
  }

  getServiceProvider() {
    this._deviceService.getServiceProvider().subscribe(res => {
      this.serviceProvider = res.result;
    });
  }

  findDeviceGroup(groupName) {
    let params = {
      userRole: this.storage.get('UserRole'),
      userEmailID: this._adalService.userInfo.userName
    };
    this._deviceService.getDeviceGroups(params).subscribe(res => {
      let index = res.result.findIndex(
        val => val.device_group_name == groupName
      );
      if (index > -1) {
        this.deviceGroupExist = true;
        this.deviceGroupAvailable = false;
      } else {
        this.deviceGroupExist = false;
        this.deviceGroupAvailable = true;
      }
    });
  }
}
