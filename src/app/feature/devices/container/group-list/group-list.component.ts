import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceConstant } from '../../constants/devices-contants';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DeviceService } from '../../services/device.service';
import { NotificationsService } from 'angular2-notifications';
import { AdalService } from 'adal-angular4';
@Component({
  selector: 'dpdhl-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  deviceGroupList: any;
  componentRoles;
  privilages;
  role;
  appUser;
  deviceList;
  popUpConfig: any = {
    title: 'Device Group Delete Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to delete Device Group?',
    rowThree:
      'Once you confirm, it will be deleted with all the respective association.'
  };

  displayedColumns: string[] = [
    'select',
    'device_type_name',
    'device_group_name',
    'service_provider',
    'parent_name',
    'is_exists',
    'created_by',
    'created_date',
    'action'
  ];
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'device_group_name',
    dataColumnOptions: DeviceConstant.dataColumnOptionsGroup,
    actionOptions: {
      edit: true,
      delete: true,
      setting: false,
      view: true
    },
    exportExcel: true,
    exportExcelName: 'DeviceList.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _deviceService: DeviceService,
    private _notificationService: NotificationsService,
    private _adalService: AdalService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.deviceGroupList = data.resolveDeviceGroupList.result;
    });
    /***********privilages******* */
    this.privilages = this.storage.get('privileges');
    this.componentRoles = this.serchPrivilage('device');
    this.role = this.componentRoles[0].rights[0];

    this.configuration.exportExcel = this.role.export;
    this.configuration.actionOptions = {
      edit: this.role.edit,
      delete: this.role.delete,
      view: true
    };
    this.appUser = this.storage.get('UserRole');
    if (this.appUser == 'Default App User Role') {
      this.deviceList = true;
    }
    /****************************** */
  }
  serchPrivilage(searchName) {
    return this.privilages[0].filter(obj => {
      return obj.role == searchName;
    });
  }

  getDeviceGroups() {
    let params = {
      userRole: this.storage.get('UserRole'),
      userEmailID: this._adalService.userInfo.userName
    };
    this._deviceService.getDeviceGroups(params).subscribe(res => {
      if (res) {
        this.deviceGroupList = res.result;
      }
    });
  }

  editDevice(id) {
    this._router.navigate(['/devices/onboard/' + id]);
  }

  viewDevice(id) {
    let index = this.deviceGroupList.findIndex(val => val.id == id);
    this._router.navigate([
      '/devices/list-detail/',
      this.deviceGroupList[index].id
    ]);
  }

  deleteDevice(id) {
    this._deviceService.deleteGroupDevice(id).subscribe(res => {
      if (res) {
        this.getDeviceGroups();
        this._notificationService.success('Device Group Deleted Successfully');
      }
    });
  }
}
