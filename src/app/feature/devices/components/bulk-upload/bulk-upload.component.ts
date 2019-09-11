import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'dpdhl-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {
  @Output() uplaodDeviceData: EventEmitter<any> = new EventEmitter<any>();
  errorMessage: any;

  showReview: boolean = false;
  constructor(private _deviceService: DeviceService, private _router: Router) {}

  ngOnInit() {}
  fileInput;
  onFileChange(ev) {
    let workBook = null;

    let jsonData = null;

    const reader = new FileReader();

    const file = ev.target.files[0];

    reader.onload = event => {
      const data = reader.result;

      workBook = XLSX.read(data, { type: 'binary' });
      let bookName = [];
      workBook.SheetNames.forEach(function(sheetName) {
        bookName.push(sheetName);
      });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];

        initial[name] = XLSX.utils.sheet_to_json(sheet);

        return initial;
      }, {});

      let exportData = { data: jsonData[bookName[0]] };

      this.uplaodDeviceData.emit(exportData);
    };

    reader.readAsBinaryString(file);

    this.fileInput.nativeElement.value = '';
  }
  showReiew;
  multipleReview;
  selectedIndex;
  review() {
    this.showReiew = true;

    this.multipleReview = [262, 263, 264];

    this.loadReviewData(262);
  }

  next() {
    ++this.selectedIndex;

    this.loadReviewData(this.multipleReview[this.selectedIndex]);
  }

  previous() {
    --this.selectedIndex;

    this.loadReviewData(this.multipleReview[this.selectedIndex]);
  }

  loadReviewData(appid) {
    // this._applicationService
    //   .getApplicationById(appid)
    //   .subscribe(data => {
    //     console.log(data);
    // this.applicationForm = this._fb.group({
    //   appName: data.result[0].name,
    //   appOwner: data.result[0].owner,
    //   appStatus: data.result[0].appStatus,
    //   appGroupName: data.result[0].group_name,
    //   appCreatedBy: data.result[0].created_by,
    //   resourceGroupName: data.resource_group_name,
    //   appDescription: data.result[0].description
    // });
    // });
  }
}
