import { Component, OnInit } from '@angular/core';
import { IApplicationForm } from '../../models/application.models';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { NotificationsService } from 'angular2-notifications';
import { ApplicationConstants } from '../../constants/application.constants';

@Component({
  selector: 'dpdhl-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  applicationData: IApplicationForm;
  BUList: any;
  ResourceGroup: any;
  ResourceList: any;
  BUHeadStatus: boolean = false;
  manipulateArray: any;

  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  editNavigation: boolean = false;

  constructor(
    private _adalService: AdalService,
    private _route: ActivatedRoute,
    private _applicationService: ApplicationService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.applicationData = {
      id: 0,
      buID: null,
      appName: '',
      appOwner: this._adalService.userInfo.profile.upn,
      appStatus: '',
      appGroupName: '',
      appCreatedBy: this._adalService.userInfo.profile.given_name,
      appDescription: '',
      resourceGroupName: '',
      appOwnerName: this._adalService.userInfo.profile.given_name,
      imgData: '',
      url: ''
    };
    this._route.data.subscribe(data => {
      if (data) {
        this.BUList = data.resolveBusinessUnit.result;
        this.ResourceGroup = data.resolveResourceGroup.value;
      }
    });
  }

  searchBUHead(buHead) {
    this.editNavigation = false;
    this._applicationService.searchBUUser(buHead).subscribe(res => {
      if (res && res.value && res.value.length == 1) {
        this.applicationData.appOwnerName = res.value[0].givenName;
        this.BUHeadStatus = false;
      } else {
        // this.applicationData.appOwner = buHead;
        this.BUHeadStatus = true;
      }
    });
  }

  getResourceList(role) {
    this.editNavigation = false;
    this._applicationService.getResourceList(role).subscribe(res => {
      if (res) {
        this.ResourceList = res.value;
      }
    });
  }

  getBuDetails(id) {
    return this.BUList.filter(x => x.id === id);
  }

  getRoleGroup(role) {
    this.editNavigation = false;
    this.applicationData.resourceGroupName = role;
    this.getResourceList(role);
  }

  createApplication(formData) {
    let resourceGroup = formData.resourceGroupName;
    this._applicationService
      .createResourceGroup(resourceGroup)
      .subscribe(res => {
        if (
          res &&
          res.properties &&
          res.properties.provisioningState &&
          res.properties.provisioningState == 'Succeeded'
        ) {
          formData.appOwnerName =
            formData.appOwnerName == ''
              ? this.applicationData.appOwnerName
              : formData.appOwnerName;
          formData.grandParentName = null;
          formData.grandParentID = null;
          formData.grandParentType = null;
          this._applicationService
            .createApplication(formData)
            .subscribe(res => {
              if (res) {
                this._router.navigate(['/application']);
                this._notificationsService.success(
                  ApplicationConstants.App_Message
                );
              }
            });
        }
      });
    // let buDetails = this.getBuDetails(formData.buID);
    // formData.appOwnerName =
    //   formData.appOwnerName == ''
    //     ? this.applicationData.appOwnerName
    //     : formData.appOwnerName;
    // formData.grandParentName = null;
    // formData.grandParentID = null;
    // formData.grandParentType = null;
    // this._applicationService.createApplication(formData).subscribe(res => {
    //   if (res) {
    //     this._router.navigate(['/application']);
    //     this._notificationsService.success(ApplicationConstants.App_Message);
    //   }
    // });
  }

  uploadBulkApplication(data) {

    this.manipulateArray = data.data.map(function (obj) {
      return {
        appCreatedBy: obj.appCreatedBy,
        appDescription: obj.appDescription,
        appName: obj.appName,
        appOwner: obj.appOwner,
        appOwnerName: obj.appOwnerName,
        appStatus: obj.appStatus,
        appGroupName: obj.applicationVertical,
        appurl: obj.appurl,
        resourceGroupName: obj.resourceGroupName
      };
    });
    data.data = this.manipulateArray;
    this._applicationService.bulkUpload(data).subscribe(res => {
      if (res) {
        this._router.navigate(['/application']);
        this._notificationsService.success(
          ApplicationConstants.App_Bulkupload_Message
        );
      }
    });
  }
}
