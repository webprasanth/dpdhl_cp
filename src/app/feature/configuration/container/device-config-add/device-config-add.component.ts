import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { ConfigurationService } from '../../services/configuration.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'dpdhl-device-config-add',
  templateUrl: './device-config-add.component.html',
  styleUrls: ['./device-config-add.component.scss']
})
export class DeviceConfigAddComponent implements OnInit {
  deviceSpecData = {
    id: null,
    serviceProvider: '',
    apiURL: '',
    protocol: '',
    isPowerEnabled: false,
    isBatteryEnabled: false,
    isIOTEnabled: false,
    imgData: '',
    specFileData: '',
    createdBy: '',
    modifiedBy: ''
  };

  constructor(
    private _adalService: AdalService,
    private _configurationService: ConfigurationService,
    private _router: Router,
    private _notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.deviceSpecData.createdBy = this._adalService.userInfo.userName;
    this.deviceSpecData.modifiedBy = this._adalService.userInfo.userName;
  }

  createDeviceConfig(form) {
    this._configurationService.createDeviceSpecs(form).subscribe(res => {
      if (res) {
        this._notificationService.success('Created Device Spec Successfully');
        this._router.navigate(['/configuration']);
      }
    });
  }
}
