import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { IApplicationForm } from '../../models/application.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() applicationData: IApplicationForm;
  @Input() BUList: any;
  @Input() ResourceGroup: any;
  @Input() BUHeadStatus: boolean;
  @Input() ResourceList: any;
  @Input() multipleEdit: any;
  @Input() slidesIndex: number;
  @Input() editNavigation: boolean;

  @Output() checkAppOwner: EventEmitter<any> = new EventEmitter<any>();
  @Output() getRoleGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() applicationFormData: EventEmitter<any> = new EventEmitter<any>();
  @Output() uploadBulkApplicationData: EventEmitter<any> = new EventEmitter<
    any
  >();

  applicationForm: FormGroup;
  appImage: string;
  fileUploadMessage: boolean;
  resourceGroupListData: boolean = false;
  popUpVisibility: boolean = false;
  appGroupList = [
    ' Track and Trace',
    'Smart Energy',
    'Asset Monitoring',
    'Predictive Maintenance',
    'Customer Satisfaction'
  ];

  popUpConfig: any = {
    title: 'Application Edit Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to update Application details?',
    rowThree:
      'Once you confirm, it will be updated with all the respective association.'
  };
  constructor(private _fb: FormBuilder, private _router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.applicationForm = this._fb.group({
      id: [this.applicationData.id],
      buID: [this.applicationData.buID],
      appName: [this.applicationData.appName, [Validators.required]],
      appDescription: [this.applicationData.appDescription],
      appOwner: [{ value: this.applicationData.appOwner, disabled: this.storage.get('UserRole') == 'Application Admin' ? true : false }, [Validators.required]],
      appOwnerName: [this.applicationData.appOwnerName],
      appGroupName: [this.applicationData.appGroupName, [Validators.required]],
      appStatus: ['Active'],
      appCreatedBy: [
        { value: this.applicationData.appCreatedBy, disabled: true },
        [Validators.required]
      ],
      resourceGroupName: [this.applicationData.resourceGroupName],
      imgData: [this.applicationData.imgData],
      url: [this.applicationData.url, [Validators.required]],
      parentID: [this.applicationData.parentID],
      parentName: [{ value: this.applicationData.parentName, disabled: true }],
      parentType: [this.applicationData.parentType]
    });
    this.appImage = this.applicationData.imgData;
  }

  ngOnChanges() {
    if (this.editNavigation) {
      this.applicationForm = this._fb.group({
        id: [this.applicationData.id],
        buID: [this.applicationData.buID],
        appName: [this.applicationData.appName, [Validators.required]],
        appDescription: [this.applicationData.appDescription],
        appOwner: [{ value: this.applicationData.appOwner, disabled: this.storage.get('UserRole') == 'Application Admin' ? true : false }, [Validators.required]],
        appOwnerName: [this.applicationData.appOwnerName],
        appGroupName: [
          this.applicationData.appGroupName,
          [Validators.required]
        ],
        appStatus: ['Active'],
        appCreatedBy: [
          { value: this.applicationData.appCreatedBy, disabled: true },
          [Validators.required]
        ],
        resourceGroupName: [this.applicationData.resourceGroupName],
        imgData: [this.applicationData.imgData],
        url: [this.applicationData.url, [Validators.required]],
        parentID: [this.applicationData.parentID],
        parentName: [
          { value: this.applicationData.parentName, disabled: true }
        ],
        parentType: [this.applicationData.parentType]
      });
      this.appImage = this.applicationData.imgData;
    }
  }
  get formCtrl() {
    return this.applicationForm.controls;
  }
  handleUpload(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (event.target.result.length * 2 > 2 ** 21) {
          this.fileUploadMessage = true;
        } else {
          this.appImage = event.target.result;
          this.applicationForm.patchValue({ imgData: this.appImage });
          this.applicationForm.markAsDirty();
          this.fileUploadMessage = false;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  searchBUOwner() {
    this.checkAppOwner.emit(this.applicationForm.get('appOwner').value);
  }

  onResourceSelect(event) {
    this.getRoleGroup.emit(this.applicationForm.get('resourceGroupName').value);
  }

  decreaseEdit() {
    this.editNavigation = true;
    if (this.slidesIndex > 0) {
      this.slidesIndex--;
      this._router.navigate([
        '/application/edit/',
        this.multipleEdit[this.slidesIndex]
      ]);
    }
  }

  increaseEdit() {
    this.editNavigation = true;
    if (this.slidesIndex < this.multipleEdit.length - 1) {
      this.slidesIndex++;
      this._router.navigate([
        '/application/edit/',
        this.multipleEdit[this.slidesIndex]
      ]);
    }
  }

  popUpEvent(event) {
    if (event) {
      this.applicationFormData.emit(this.applicationForm.getRawValue());
      this.popUpVisibility = false;
    } else if (!event) {
      this.popUpVisibility = false;
    }
  }

  onBUSelection(event) {
    let index = this.BUList.findIndex(val => val.id == event);
    if (index > -1) {
      this.applicationForm.patchValue({
        parentName: this.BUList[index].name,
        parentType: this.BUList[index].type
      });
      this.applicationForm.markAsDirty();
    } else {
      this.applicationForm.patchValue({
        parentID: null,
        parentName: null,
        parentType: null
      });
      this.applicationForm.markAsDirty();
    }
  }

  onSubmit() {
    if (this.applicationData.id > 0) {
      this.popUpConfig.rowOne = this.applicationData.appName;
      this.popUpVisibility = true;
    } else {
      this.applicationForm.patchValue({
        resourceGroupName: this.applicationForm.controls['appName'].value + 'EU'
      });
      // console.log(this.applicationForm.getRawValue());
      this.applicationFormData.emit(this.applicationForm.getRawValue());
      this.popUpVisibility = false;
    }
  }

  buldUploadData(data) {
    this.uploadBulkApplicationData.emit(data);
  }
  showResourceGroup() {
    this.resourceGroupListData = true;
  }

  onSelectionChange() {
    this.resourceGroupListData = false;
  }
}
