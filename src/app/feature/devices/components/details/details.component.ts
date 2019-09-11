import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDeviceForm } from '../../model/devices-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'dpdhl-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() deviceData: IDeviceForm;
  @Output() deviceFormData: EventEmitter<any> = new EventEmitter<any>();
  deviceForm: FormGroup;
  @Output() uploadBulkDeviceData: EventEmitter<any> = new EventEmitter<
    any
    >();
  constructor(private _fb: FormBuilder, private _router: Router) { }


  ngOnInit() {
    this.deviceForm = this._fb.group({
      dhlDeviceID: [this.deviceData.dhlDeviceID],
      uuID: [this.deviceData.uuID],
      deviceName: [this.deviceData.deviceName, [Validators.required]],
      serialNumber: [
        this.deviceData.serialNumber,
        [Validators.required]
      ],
      status: [this.deviceData.status, [Validators.required]],
      protocol: [this.deviceData.protocol],
      deviceHealth: [
        this.deviceData.deviceHealth],
      onboardedBy: [
        this.deviceData.onboardedBy,
        [Validators.required]
      ],
      deviceOwner: [
        this.deviceData.deviceOwner,
        [Validators.required]
      ],
      powerType: [
        this.deviceData.powerType,
        [Validators.required]
      ],
      macAddress: [this.deviceData.powerType, [Validators.required]],
      appIDs: null,
      iotReady: true,
      deviceSpecID: 1
    });

  }
  onSubmit() {
    this.deviceFormData.emit(this.deviceForm.getRawValue());
  }
  bulkUploadData(data) {
    this.uploadBulkDeviceData.emit(data);

  }
}
