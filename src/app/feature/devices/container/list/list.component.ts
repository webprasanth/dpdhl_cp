import { Component, OnInit, Inject } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeviceList } from '../../model/devices-model';
import { DeviceConstant } from '../../constants/devices-contants';
import { NotificationsService } from 'angular2-notifications';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'dpdhl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  popUpConfig: any = {
    title: 'Device Delete Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to delete Device details?',
    rowThree:
      'Once you confirm, it will be deleted with all the respective association.'
  };
  popUpVisibility: boolean = false;
  fileUploadMessage: boolean = false;

  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  constructor(
    private _deviceService: DeviceService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notificationsService: NotificationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  displayedColumns: string[] = [
    'select',
    'device_type_name',
    'is_exists',
    'modified_by',
    'modified_date',
    'action'
  ];
  deviceList: Array<IDeviceList>;
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'device_name',
    dataColumnOptions: DeviceConstant.dataColumnOptions,
    actionOptions: {
      edit: true,
      delete: false,
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

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.deviceList = data.resolveDeviceList.result;
    });
  }

  getAllDeviceList() {
    this._deviceService.getAllDevices().subscribe(res => {
      if (res) {
        this.deviceList = res.result;
      }
    });
  }
  editDevice(id) {
    this._router.navigate(['/devices/list-detail/', id]);
  }
  viewDevice(id) {
    this._router.navigate(['/devices/list-detail/', id]);
  }
  deleteDevice(id) {
    this._deviceService.deleteDevice(id).subscribe(res => {
      if (res) {
        this.getAllDeviceList();
        this.popUpVisibility = true;
        this._notificationsService.success(
          DeviceConstant.Device_Deleted_Message
        );
      }
    });
  }
}
