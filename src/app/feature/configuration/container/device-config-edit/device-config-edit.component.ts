import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdalService } from 'adal-angular4';
import { ConfigurationService } from '../../services/configuration.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'dpdhl-device-config-edit',
  templateUrl: './device-config-edit.component.html',
  styleUrls: ['./device-config-edit.component.scss']
})
export class DeviceConfigEditComponent implements OnInit {
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
    modifiedBy: '',
    object: '',
    interval_in_sec: ''
  };

  constructor(
    private _adalService: AdalService,
    private _configurationService: ConfigurationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.deviceSpecData.id = data.resolveDeviceSpecId.result[0].id;
      this.deviceSpecData.serviceProvider =
        data.resolveDeviceSpecId.result[0].service_provider;
      this.deviceSpecData.apiURL = data.resolveDeviceSpecId.result[0].api_url;
      this.deviceSpecData.protocol =
        data.resolveDeviceSpecId.result[0].protocol;
      this.deviceSpecData.isPowerEnabled =
        data.resolveDeviceSpecId.result[0].is_power_enabled;
      this.deviceSpecData.isBatteryEnabled =
        data.resolveDeviceSpecId.result[0].is_battery_enabled;
      this.deviceSpecData.isIOTEnabled =
        data.resolveDeviceSpecId.result[0].is_iot_ready;
      this.deviceSpecData.createdBy =
        data.resolveDeviceSpecId.result[0].created_by;
      this.deviceSpecData.modifiedBy = this._adalService.userInfo.userName;
      this.deviceSpecData.object = data.resolveDeviceSpecId.result[0].object;
      this.deviceSpecData.interval_in_sec =
        data.resolveDeviceSpecId.result[0].interval_in_sec;
    });
  }

  updateDeviceConfig(form) {
    this._configurationService.updateDeviceSpecs(form).subscribe(res => {
      if (res) {
        this._notificationService.success('Updated Device Spec Successfully');
        this._router.navigate(['/configuration']);
      }
    });
  }
}
