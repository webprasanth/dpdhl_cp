import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { IApplicationForm } from '../../models/application.models';
import { ApplicationConstants } from '../../constants/application.constants';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'dpdhl-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  applicationData: IApplicationForm;
  BUList: any;
  ResourceGroup: any;
  ResourceList: any;
  BUHeadStatus: boolean = false;
  multipleEdit: any;

  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  slidesIndex: number = 0;
  editNavigation: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _applicationService: ApplicationService,
    private _notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        // this.selectedResource =
        // data.resolveApplicationById.result[0].resource_group_name;
        this.applicationData = {
          id: data.resolveApplicationById.result[0].id,
          buID: data.resolveApplicationById.result[0].bu_id,
          appName: data.resolveApplicationById.result[0].name,
          appOwner: data.resolveApplicationById.result[0].owner,
          appOwnerName: data.resolveApplicationById.result[0].owner_name,
          appStatus: data.resolveApplicationById.result[0].appStatus,
          appGroupName: data.resolveApplicationById.result[0].group_name,
          appCreatedBy: data.resolveApplicationById.result[0].created_by,
          resourceGroupName:
            data.resolveApplicationById.result[0].resource_group_name,
          appDescription: data.resolveApplicationById.result[0].description,
          imgData: data.resolveApplicationById.result[0].imgData,
          url: data.resolveApplicationById.result[0].url,
          parentID: data.resolveApplicationById.result[0].parent_id,
          parentName: data.resolveApplicationById.result[0].parent_name,
          parentType: data.resolveApplicationById.result[0].parent_type
        };
        this.BUList = data.resolveBusinessUnit.result;
        this.ResourceGroup = data.resolveResourceGroup.value;
        this.getResourceList(
          data.resolveApplicationById.result[0].resource_group_name
        );
      }
    });
    this._applicationService.currentEditItems.subscribe(items => {
      this.multipleEdit = items;
    });
  }

  searchBUHead(buHead) {
    this.editNavigation = false;
    this._applicationService.searchBUUser(buHead).subscribe(res => {
      if (res && res.value && res.value.length == 1) {
        this.applicationData.appOwnerName = res.value[0].givenName;
        this.BUHeadStatus = false;
      } else {
        this.applicationData.appOwner = buHead;
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

  updateApplication(formData) {
    let buDetails = this.getBuDetails(formData.buID);
    let params = {
      id: formData.id,
      buID: formData.buID,
      appName: formData.appName,
      appOwner: formData.appOwner,
      appStatus: formData.appStatus,
      appGroupName: formData.appGroupName,
      appModifiedBy: formData.appCreatedBy,
      appDescription: formData.appDescription,
      resourceGroupName: formData.resourceGroupName,
      appRoleIDs: [formData.appRole],
      imgData: formData.imgData,
      url: formData.url,
      appOwnerName:
        this.applicationData.appOwnerName != '' ? this.applicationData.appOwnerName : formData.appOwnerName,
      parentID: formData.parentID,
      parentName: formData.parentName,
      parentType: formData.parentType,
      grandParentName: null,
      grandParentID: null,
      grandParentType: null
    };
    this._applicationService.updateApplication(params).subscribe(res => {
      if (res) {
        if (this.multipleEdit.length > 1) {
          let index = this.multipleEdit.indexOf(params.id);
          this.multipleEdit.splice(index, 1);
          this._router.navigate(['/application/edit/', this.multipleEdit[0]]);
          this.slidesIndex = 0;
        } else {
          this.multipleEdit = [];
          this._notificationsService.success(
            ApplicationConstants.App_Updated_Message
          );
          this._router.navigate(['/application']);
        }
      }
    });
  }
}
