import { Component, OnInit } from '@angular/core';
import { IDeviceForm } from '../../model/devices-model';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { NotificationsService } from 'angular2-notifications';
import { DeviceConstant } from '../../constants/devices-contants';

@Component({
  selector: 'dpdhl-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  deviceData: IDeviceForm;
  BUList: any;
  ResourceGroup: any;
  ResourceList: any;
  BUHeadStatus: boolean = false;
  errorMessage = false;
  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };


  constructor(
    private _adalService: AdalService,
    private _route: ActivatedRoute,
    private _deviceService: DeviceService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.deviceData = {
      dhlDeviceID: 0,
      uuID: " ",
      serialNumber: 0,
      macAddress: " ",
      deviceName: " ",
      status: " ",
      protocol: " ",
      deviceHealth: " ",
      onboardedBy: " ",
      deviceOwner: " ",
      powerType: " ",
      appIDs: '',
      iotReady: true,
      deviceSpecID: 1
    };
  }

  createDevice(formData) {
    this._deviceService.createDevice(formData).subscribe(res => {
      if (res) {
        this._router.navigate(['/devices']);
        this._notificationsService.success(DeviceConstant.Device_Message);
      }
    });
  }

  uploadBulkDevice(data) {
    this._deviceService.bulkUpload(data).subscribe(res => {
      if (res) {
        this._router.navigate(['/devices']);
        // angular.forEach(res.result.success, function(value, key) {
        //   console.log(key + ': ' + value);
        //   this.multipleReview.push = value;
        // });
      } else {
        this.errorMessage = true;
      }
    });
  }
}
