import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'dpdhl-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.scss']
})
export class DeviceConfigComponent implements OnInit {
  @Input() deviceSpecData: any;
  @Output() deviceFormEvent: EventEmitter<any> = new EventEmitter<any>();

  deviceSpecForm: FormGroup;
  hDisplay: any;
  mDisplay: any;
  sDisplay: any;
  hTDisplay: any;
  mTDisplay: any;
  sTDisplay: any;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    if (this.deviceSpecData) {
      this.deviceSpecForm = this._fb.group({
        id: [this.deviceSpecData.id],
        serviceProvider: [
          { value: this.deviceSpecData.serviceProvider, disabled: true }
        ],
        apiURL: [this.deviceSpecData.apiURL],
        protocol: [this.deviceSpecData.protocol],
        isPowerEnabled: [this.deviceSpecData.isPowerEnabled],
        isBatteryEnabled: [this.deviceSpecData.isBatteryEnabled],
        isIOTEnabled: [this.deviceSpecData.isIOTEnabled],
        imgData: [this.deviceSpecData.imgData],
        specFileData: [this.deviceSpecData.specFileData],
        object: [this.deviceSpecData.object],
        createdBy: [this.deviceSpecData.createdBy],
        modifiedBy: [this.deviceSpecData.modifiedBy],
        intervalInSec: [this.secondsToHms(this.deviceSpecData.interval_in_sec)]
      });
    }
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    this.hDisplay = h > 0 ? h : 0;
    this.mDisplay = m > 0 ? m : 0;
    this.sDisplay = s > 0 ? s : 0;
    this.hTDisplay = this.hDisplay * 60 * 60;
    this.mTDisplay = this.mDisplay * 60;
    this.sTDisplay = this.sDisplay;
  }

  setTimeInterval(time, name) {
    if (name == 'hours') {
      this.hTDisplay = Number(time) * 60 * 60;
      this.deviceSpecForm.patchValue({
        intervalInSec: this.hTDisplay + this.mTDisplay + this.sTDisplay
      });
    }
    if (name == 'mins') {
      this.mTDisplay = Number(time) * 60;
      this.deviceSpecForm.patchValue({
        intervalInSec: this.hTDisplay + this.mTDisplay + this.sTDisplay
      });
    }
    if (name == 'seconds') {
      this.sTDisplay = Number(time);
      this.deviceSpecForm.patchValue({
        intervalInSec: this.hTDisplay + this.mTDisplay + this.sTDisplay
      });
    }
  }

  getObjectInfo(value, name) {
    if (name == 'username') {
      this.deviceSpecData.object.username = value;
      this.deviceSpecForm.patchValue({
        object: this.deviceSpecData.object
      });
    }
    if (name == 'password') {
      this.deviceSpecData.object.password = value;
      this.deviceSpecForm.patchValue({
        object: this.deviceSpecData.object
      });
    }
    if (name == 'email') {
      this.deviceSpecData.object.email = value;
      this.deviceSpecForm.patchValue({
        object: this.deviceSpecData.object
      });
    }
    if (name == 'project') {
      this.deviceSpecData.object.project = value;
      this.deviceSpecForm.patchValue({
        object: this.deviceSpecData.object
      });
    }
    if (name == 'token') {
      this.deviceSpecData.object.token = value;
      this.deviceSpecForm.patchValue({
        object: this.deviceSpecData.object
      });
    }
  }

  onSubmit() {
    // this.deviceSpecData.getRawValue();
    this.deviceFormEvent.emit(this.deviceSpecForm.getRawValue());
  }
}
