import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApplicationConstants } from '../../constants/application.constants';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dpdhl-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {
  @Output() uplaodAppData: EventEmitter<any> = new EventEmitter<any>();

  showReview: boolean = false;
  uploadedApplicationList: any;
  selectAppList: any;

  displayedColumns: string[] = [
    'select',
    'appName',
    'appDescription',
    'appOwner',
    'appOwnerName',
    'appGroupName',
    'appCreatedBy',
    'resourceGroupName',
    'appurl',
    'appStatus'
  ];
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'appName',
    dataColumnOptions: ApplicationConstants.dataColumnOptionsBulkUpload,
    actionOptions: {
      edit: true,
      delete: true,
      view: true
    },
    exportExcel: true,
    exportExcelName: 'Application.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  constructor(
    private _notificationService: NotificationsService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

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
      if (exportData && exportData.data && exportData.data.length > 0) {
        this.uploadedApplicationList = exportData.data;
        this.showReview = !this.showReview;
      } else {
        this._notificationService.error('No Application list added to XLXS');
      }
    };

    reader.readAsBinaryString(file);
  }

  getSelectedApplication(event) {
    this.selectAppList = {
      data: event
    };
  }

  bulkApplicationUpload() {
    this.uplaodAppData.emit(this.selectAppList);
  }

  // review() {
  //   this.showReiew = true;

  //   this.multipleReview = [262, 263, 264];

  //   this.loadReviewData(262);
  // }

  // next() {
  //   ++this.selectedIndex;

  //   console.log(
  //     'selectindex next()....',
  //     this.multipleReview[this.selectedIndex]
  //   );

  //   this.loadReviewData(this.multipleReview[this.selectedIndex]);
  // }

  // previous() {
  //   --this.selectedIndex;

  //   console.log(
  //     'selectindex prev()....',
  //     this.multipleReview[this.selectedIndex]
  //   );

  //   this.loadReviewData(this.multipleReview[this.selectedIndex]);
  // }

  // loadReviewData(appid) {
  //   this._applicationService

  //     .getApplicationById(appid)

  //     .subscribe(data => {
  //       console.log(data);

  //       this.applicationForm = this._fb.group({
  //         appName: data.result[0].name,

  //         appOwner: data.result[0].owner,

  //         appStatus: data.result[0].appStatus,

  //         appGroupName: data.result[0].group_name,

  //         appCreatedBy: data.result[0].created_by,

  //         resourceGroupName: data.resource_group_name,

  //         appDescription: data.result[0].description
  //       });
  //     });
  // }
}
