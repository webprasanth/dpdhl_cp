import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { IDeviceForm } from '../../model/devices-model';
import { DeviceConstant } from '../../constants/devices-contants';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'dpdhl-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  deviceData: IDeviceForm;
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _notificationsService: NotificationsService,
    private _deviceService: DeviceService) {

  }

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        this.deviceData = {
          id: data.resolveDeviceID.result[0].id,
          dhlDeviceID: data.resolveDeviceID.result[0].dhl_device_id,
          uuID: data.resolveDeviceID.result[0].uuid,
          serialNumber: data.resolveDeviceID.result[0].serial_number,
          macAddress: data.resolveDeviceID.result[0].mac_address,
          deviceName: data.resolveDeviceID.result[0].device_name,
          status: data.resolveDeviceID.result[0].status,
          protocol: data.resolveDeviceID.result[0].protocol,
          deviceHealth: data.resolveDeviceID.result[0].device_health,
          onboardedBy: data.resolveDeviceID.result[0].onboarded_by,
          deviceOwner: data.resolveDeviceID.result[0].device_owner,
          powerType: data.resolveDeviceID.result[0].power_type,
          appIDs: data.resolveDeviceID.result[0].appIDs,
          iotReady: data.resolveDeviceID.result[0].iot_ready,
          deviceSpecID: data.resolveDeviceID.result[0].device_spec_id,
        }
      }
    });
  }
  updateDevice(formData) {
    this._deviceService.updateDevice(formData).subscribe(res => {
      if (res) {
        this._notificationsService.success(DeviceConstant.Device_Updated_Message);
        this._router.navigate(['/devices']);
      }
    });
  }
}
