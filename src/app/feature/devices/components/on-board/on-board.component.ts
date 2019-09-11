import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AdalService } from 'adal-angular4';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'dpdhl-on-board',
  templateUrl: './on-board.component.html',
  styleUrls: ['./on-board.component.scss']
})
export class OnBoardComponent implements OnInit {
  @Input() deviceFormData: any;
  @Input() serviceProvider: any;
  @Input() deviceGroupExist: boolean;
  @Input() deviceAPIList: any;
  @Input() displayedColumns: any;
  @Input() configuration: any;
  @Input() deviceAPIListView: any;
  @Input() onBoardType: string;
  @Input() serviceProviderURL: any;
  @Input() deviceGroupAvailable: any;
  @Output() deviceOnboardEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deviceByAPIEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchGroupEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() serviceProviderEvent: EventEmitter<any> = new EventEmitter<any>();

  deviceOnboardingForm: FormGroup;
  deviceUploadView: boolean = false;
  apiForm: boolean = true;
  dataColumnOptions: any = [
    {
      title: 'Select',
      property: 'select',
      width: 50,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];

  displayedColumnsEdit: any = ['select'];
  dataColumnOptionsEdit: any = [
    {
      title: 'Select',
      property: 'select',
      width: 50,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];

  configurationEdit: any = {
    rowList: [10, 20, 50],
    action: false,
    primaryKey: 'name',
    dataColumnOptions: this.dataColumnOptionsEdit,
    actionOptions: {
      edit: false,
      delete: false,
      setting: false
    },
    exportExcel: true,
    exportExcelName: 'DeviceMetaData.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  selectedParentEntity: any;
  nextEnable: boolean = true;
  duplicateDeviceList: any = [];
  downloadTemplateUrl: string;
  constructor(
    private _fb: FormBuilder,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _notificationService: NotificationsService
  ) { }

  ngOnInit() {
    // if (this.deviceFormData) {
    console.log(this.deviceFormData);
    if (this.storage.get('parentEntity')) {
      this.selectedParentEntity = this.storage.get('parentEntity');
      this.storage.remove('parentEntity');
    } else {
      this.selectedParentEntity = '';
    }
    this.deviceOnboardingForm = this._fb.group({
      serviceProvider: [
        {
          value: this.deviceFormData.serviceProvider,
          disabled: this.onBoardType == 'edit' ? true : false
        },
        [Validators.required]
      ],
      serviceProviderID: [this.deviceFormData.serviceProviderID],
      deviceTypeName: [
        {
          value: this.deviceFormData.deviceTypeName,
          disabled: this.onBoardType == 'edit' ? false : false
        },
        [Validators.required]
      ],
      deviceTypeNameID: [this.deviceFormData.deviceTypeNameID],
      deviceGroupID: [this.deviceFormData.deviceGroupID],
      deviceGroupName: [
        {
          value: this.deviceFormData.deviceGroupName,
          disabled: this.onBoardType == 'edit' ? true : false
        },
        [Validators.required]
      ],
      createdBy: [this.deviceFormData.createdBy],
      modifiedBy: [this.deviceFormData.modifiedBy],
      deviceMetadata: [
        this.deviceFormData.deviceMetadata,
        [Validators.required]
      ],
      newDeviceMetadata: [''],
      removedDeviceMetadata: [''],
      url: [''],
      username: [
        {
          value: this.deviceFormData.username,
          disabled: this.onBoardType == 'edit' ? true : false
        }
      ],
      password: [
        {
          value: this.deviceFormData.password,
          disabled: this.onBoardType == 'edit' ? true : false
        }
      ],
      email: [
        {
          value: this.deviceFormData.email,
          disabled: this.onBoardType == 'edit' ? true : false
        }
      ],
      token: [
        {
          value: this.deviceFormData.token,
          disabled: this.onBoardType == 'edit' ? true : false
        }
      ],
      project: [
        {
          value: this.deviceFormData.project,
          disabled: this.onBoardType == 'edit' ? true : false
        }
      ],
      parentID: [''],
      parentName: [{ value: '', disabled: true }],
      parentType: ['']
    });
    // }
    if (this.onBoardType == 'edit') {
      this.deviceOnboardingForm.patchValue({
        parentID: this.deviceFormData.parentID,
        parentName: this.deviceFormData.parentName,
        parentType: this.deviceFormData.parentType
      });
    } else if (this.onBoardType == 'add' && this.selectedParentEntity != '') {
      this.deviceOnboardingForm.patchValue({
        parentID: this.selectedParentEntity.id,
        parentName: this.selectedParentEntity.name,
        parentType: this.selectedParentEntity.type
      });
    }
    this.deviceOnboardingForm.markAsDirty();
    if (
      this.deviceFormData &&
      this.deviceFormData.deviceMetadata &&
      this.deviceFormData.deviceMetadata.length > 0
    ) {
      var myObject = this.deviceFormData.deviceMetadata[0];
      var size = 0,
        key;
      for (key in myObject) {
        if (typeof myObject[key] != 'object') {
          this.displayedColumnsEdit.push(key);
          let obj = {
            title: key.charAt(0).toUpperCase() + key.slice(1),
            property: key,
            width: 150,
            visible: true,
            isNumber: false,
            isDate: false
          };
          this.configurationEdit.dataColumnOptions.push(obj);
        }
      }
    }
  }

  ngOnChanges() {
    if (this.serviceProviderURL) {
      if (this.serviceProviderURL.service_provider == 'Sigfox') {
        this.deviceOnboardingForm.patchValue({
          username: this.serviceProviderURL.object.username,
          password: this.serviceProviderURL.object.password,
          url: this.serviceProviderURL.api_url
        });
      }
      if (
        this.serviceProviderURL.service_provider ==
        'RPP - Red Pointlabs Platform'
      ) {
        this.deviceOnboardingForm.patchValue({
          email: this.serviceProviderURL.object.email,
          project: this.serviceProviderURL.object.project,
          token: this.serviceProviderURL.object.token
        });
      }
      this.deviceOnboardingForm.markAsDirty();
    }
    if (this.onBoardType == 'edit') {
      let index = this.serviceProvider.findIndex(
        val =>
          val.id ==
          this.deviceOnboardingForm.controls['serviceProviderID'].value
      );
      this.serviceProviderURL = this.serviceProvider[index];
      this.serviceProviderEvent.emit(this.serviceProvider[index]);
    }
    // if (
    //   this.deviceOnboardingForm.controls['username'].value == '' ||
    //   this.deviceOnboardingForm.controls['password'].value == ''
    // ) {
    //   this.nextEnable = true;
    // } else {
    //   this.nextEnable = false;
    // }
    // if (
    //   this.deviceOnboardingForm.controls['email'].value == '' ||
    //   this.deviceOnboardingForm.controls['project'].value == '' ||
    //   this.deviceOnboardingForm.controls['token'].value == ''
    // ) {
    //   this.nextEnable = true;
    // } else {
    //   this.nextEnable = false;
    // }
  }
  get formCtrl() {
    return this.deviceOnboardingForm.controls;
  }
  backTosServiceProviderAdd() {
    this.deviceAPIListView = !this.deviceAPIListView;
    this.deviceAPIList = '';
    this.configuration.dataColumnOptions = [
      {
        title: 'Select',
        property: 'select',
        width: 50,
        visible: true,
        isNumber: false,
        isDate: false
      }
    ];
    this.displayedColumns = ['select'];
  }
  backTosServiceProvider() {
    this.deviceUploadView = !this.deviceUploadView;
    this.deviceAPIList = '';
    this.configuration.dataColumnOptions = [
      {
        title: 'Select',
        property: 'select',
        width: 50,
        visible: true,
        isNumber: false,
        isDate: false
      }
    ];
    this.displayedColumns = ['select'];
  }
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = event => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      let bookName = [];
      workBook.SheetNames.forEach(function (sheetName) {
        bookName.push(sheetName);
      });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      let exportData = { data: jsonData[bookName[0]] };
      this.deviceAPIListView = true;
      if (
        this.deviceFormData.deviceMetadata &&
        this.deviceFormData.deviceMetadata.length > 0
      ) {
        let editDevice = this.getEditDuplicate(
          Object.keys(exportData.data[0])[0],
          exportData.data,
          this.deviceFormData.deviceMetadata
        );
        this.deviceAPIList = this.getUnique(
          editDevice,
          Object.keys(exportData.data[0])[0]
        );
        this.duplicateDeviceList = this.getDuplicate(
          editDevice,
          Object.keys(exportData.data[0])[0]
        );
        if (this.deviceAPIList && this.deviceAPIList.length == 0) {
          this._notificationService.error('All uploaded devices are duplicate');
        }
      } else {
        this.deviceAPIList = this.getUnique(
          exportData.data,
          Object.keys(exportData.data[0])[0]
        );
        this.duplicateDeviceList = this.getDuplicate(
          exportData.data,
          Object.keys(exportData.data[0])[0]
        );
      }
      // this.deviceOnboardingForm.patchValue({
      //   deviceMetadata: exportData.data
      // });
      if (this.deviceAPIList.length > 0) {
        this.deviceAPIListView = true;
        this.deviceUploadView = false;
      } else {
        this.deviceAPIListView = false;
        this.deviceUploadView = true;
      }
      var myObject = this.deviceAPIList[0];
      var size = 0,
        key;
      for (key in myObject) {
        if (typeof myObject[key] != 'object') {
          this.displayedColumns.push(key);
          let obj = {
            title: key.charAt(0).toUpperCase() + key.slice(1),
            property: key,
            width: 150,
            visible: true,
            isNumber: false,
            isDate: false
          };
          this.configuration.dataColumnOptions.push(obj);
        }
      }
    };
    reader.readAsBinaryString(file);
  }

  getEditDuplicate(props, result1, result2) {
    var newArr = result1.filter(function (o1) {
      return !result2.some(function (o2) {
        if (o1[props] === o2[props]) {
          return o1;
        }
      });
    });
    return newArr;
  }
  getUnique(arr, comp) {
    const unique = arr
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);
    return unique;
  }
  getDuplicate(arr, comp) {
    const duplicate = arr
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) !== i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);
    var productsIds = duplicate.map(function (product) {
      return product[comp];
    });
    return productsIds;
  }

  onSubmit() {
    this.deviceOnboardEvent.emit(this.deviceOnboardingForm.getRawValue());
  }

  getAPIDevices() {
    // let cred = {
    //   username: '5ca4a93fe833d97655ae1de1',
    //   password: '353a66754599d6a201eab14e6f401cb3'
    // };
    // this.deviceByAPIEvent.emit(cred);
    if (this.apiForm) {
      this.deviceUploadView = !this.deviceUploadView;
    } else {
      if (this.serviceProviderURL.service_provider == 'Sigfox') {
        let param = {
          username: this.deviceOnboardingForm.controls['username'].value,
          password: this.deviceOnboardingForm.controls['password'].value,
          url: this.deviceOnboardingForm.controls['url'].value
        };
        this.deviceByAPIEvent.emit(param);
      }
      if (
        this.serviceProviderURL.service_provider ==
        'RPP - Red Pointlabs Platform'
      ) {
        let param = {
          email: this.deviceOnboardingForm.controls['email'].value,
          project: this.deviceOnboardingForm.controls['project'].value,
          token: this.deviceOnboardingForm.controls['token'].value
        };
        this.deviceByAPIEvent.emit(param);
      }
      if (this.serviceProviderURL.service_provider == 'OnAsset') {
        this.deviceByAPIEvent.emit('OnAsset');
      }
      if (
        this.serviceProviderURL.service_provider == 'NFC' ||
        this.serviceProviderURL.service_provider == 'Roambee'
      ) {
        let param = {
          accessToken: this._adalService.userInfo.token
        };
        this.deviceByAPIEvent.emit(param);
      }
    }
  }

  searchGroupName() {
    this.searchGroupEvent.emit(
      this.deviceOnboardingForm.controls['deviceGroupName'].value
    );
  }

  onServiceProviderSelect(event) {
    let index = this.serviceProvider.findIndex(val => val.id == event.value);
    this.deviceOnboardingForm.patchValue({
      serviceProvider: this.serviceProvider[index].service_provider,
      url: this.serviceProvider[index].api_url
    });
    if (this.serviceProvider[index].service_provider == 'Sigfox') {
      this.downloadTemplateUrl =
        'https://cpiconsfilesblobstorage.blob.core.windows.net/cpappdevfactemplates/device.xlsx';
    }
    if (
      this.serviceProvider[index].service_provider ==
      'RPP - Red Pointlabs Platform'
    ) {
      this.downloadTemplateUrl =
        'https://cpiconsfilesblobstorage.blob.core.windows.net/cpappdevfactemplates/Rpp_Devices.xlsx';
    }
    if (this.serviceProvider[index].service_provider == 'OnAsset') {
      this.downloadTemplateUrl =
        'https://cpiconsfilesblobstorage.blob.core.windows.net/cpappdevfactemplates/Onasset_devices.xlsx';
    }
    if (this.serviceProvider[index].service_provider == 'NFC') {
      this.downloadTemplateUrl =
        'https://cpiconsfilesblobstorage.blob.core.windows.net/cpappdevfactemplates/NFC_Devices.xlsx';
    }
    if (this.serviceProvider[index].service_provider == 'Roambee') {
      this.downloadTemplateUrl =
        'https://cpiconsfilesblobstorage.blob.core.windows.net/cpappdevfactemplates/Rombee_device.xlsx';
    }
    this.deviceOnboardingForm.markAsDirty();
    this.serviceProviderEvent.emit(this.serviceProvider[index]);
  }

  selectedDataGrid(event) {
    if (this.onBoardType == 'edit') {
      this.deviceOnboardingForm.patchValue({
        newDeviceMetadata: event
      });
    } else {
      this.deviceOnboardingForm.patchValue({
        deviceMetadata: event
      });
    }
    this.deviceOnboardingForm.markAsDirty();
  }

  deSelectedDataGrid(event) {
    this.deviceOnboardingForm.patchValue({
      removedDeviceMetadata: event
    });
    this.deviceOnboardingForm.markAsDirty();
  }

  changeMethod(event) {
    if (event == 'manual') {
      this.apiForm = true;
      // this.deviceOnboardingForm.controls['username'].disable();
      // this.deviceOnboardingForm.controls['password'].disable();
    } else {
      this.apiForm = false;
      // this.deviceOnboardingForm.controls['username'].enable();
      // this.deviceOnboardingForm.controls['password'].enable();
    }
  }
}
