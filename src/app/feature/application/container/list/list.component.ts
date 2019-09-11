import { Component, OnInit, Inject } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { IApplicationList } from '../../models/application.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConstants } from '../../constants/application.constants';
import { NotificationsService } from 'angular2-notifications';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AdalService } from 'adal-angular4';
@Component({
  selector: 'dpdhl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  viewApplicationPopup = false;
  viewAppdata;
  resourceFilter;
  resourceList;
  showTable: false;
  applicationdRoles;
  componentRoles;
  ListRoles;
  privilages;
  role;
  manipulateArray: any;
  popUpConfig: any = {
    title: 'Application Delete Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to delete Application details?',
    rowThree:
      'Once you confirm, it will be deleted with all the respective association.'
  };
  popUpVisibility: boolean = false;
  fileUploadMessage: boolean = false;

  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  displayedColumns: string[] = [
    'select',
    'name',
    'parent_name',
    'owner',
    'created_by',
    'onboarded_date',
    'application_verticle',
    'status',
    'action'
  ];
  applicationList: Array<IApplicationList>;
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'name',
    dataColumnOptions: ApplicationConstants.dataColumnOptions,
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
    private _applicationService: ApplicationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notificationsService: NotificationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _adalService: AdalService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.applicationList = data.applicationList.result;
      this.manipulateArray = this.applicationList;

      this.manipulateArray = this.manipulateArray.map(function (obj) {
        return {
          bu_id: obj.bu_id,
          buname: obj.buname,
          created_by: obj.created_by,
          description: obj.description,
          grand_parent_id: obj.grand_parent_id,
          grand_parent_name: obj.grand_parent_name,
          grand_parent_type: obj.grand_parent_type,
          application_verticle: obj.group_name,
          icon_name: obj.icon_name,
          id: obj.id,
          imgData: obj.imgData,
          is_exists: obj.is_exists,
          isfavorite: obj.isfavorite,
          modified_by: obj.modified_by,
          modified_date: obj.modified_date,
          name: obj.name,
          onboarded_date: obj.onboarded_date,
          owner: obj.owner,
          owner_name: obj.owner_name,
          parent_id: obj.parent_id,
          parent_name: obj.parent_name,
          parent_type: obj.parent_type,
          resource_group_name: obj.resource_group_name,
          status: obj.status,
          url: obj.url,
        };
      });



    });

    /***********privilages******* */
    this.privilages = this.storage.get('privileges');
    this.componentRoles = this.serchPrivilage('application');
    this.role = this.componentRoles[0].rights[0];

    this.configuration.exportExcel = this.role.export;
    this.configuration.actionOptions = {
      edit: this.role.edit,
      delete: this.role.delete,
      view: true
    }
    /****************************** */

  }

  serchPrivilage(searchName) {
    return this.privilages[0].filter(obj => {
      return (obj.role == searchName);
    });
  }


  getApps() {
    let params = {
      'userRole': this.storage.get('UserRole'),
      'userEmailID': this._adalService.userInfo.userName
    }
    this._applicationService.getApplication(params).subscribe(res => {
      this.applicationList = res.result;
    });
  }

  deleteApplication(id) {
    if (id.length > 1) {
      var finalArray = id.map(function (obj) {
        return obj.id;
      });
      for (var i = 0; i < finalArray.length; i++) {
        this._applicationService
          .deleteApplication(finalArray[i])
          .subscribe(res => {
            if (res) {
              this.getApps();
              this.popUpVisibility = true;
            }
          });
      }
      this._notificationsService.success(
        ApplicationConstants.App_Deleted_Message
      );
    } else {
      this._applicationService.deleteApplication(id).subscribe(res => {
        if (res) {
          this.getApps();
          this.popUpVisibility = true;
          this._notificationsService.success(
            ApplicationConstants.App_Deleted_Message
          );
        }
      });
    }
  }

  editApplication(id) {
    if (id.length > 1) {
      var finalArray = id.map(function (obj) {
        return obj.id;
      });
      this._applicationService.updateEditItems(finalArray);
      this._router.navigate(['/application/edit/', finalArray[0]]);
    } else {
      this._router.navigate(['/application/edit/', id]);
    }
  }

  viewApplication(id) {
    this.viewApplicationPopup = true;
    return this._applicationService.getApplicationById(id).subscribe(data => {
      if (data) {
        this.viewAppdata = data.result[0];
        this.getResourceList();
      }
    });
  }

  getResourceList() {
    this._applicationService
      .getResourceList(this.viewAppdata.resource_group_name)
      .subscribe(res => {
        if (res) {
          this.resourceList = res.value;
        }
      });
  }

  closePopup(event) {
    this.viewApplicationPopup = event;
  }
}
