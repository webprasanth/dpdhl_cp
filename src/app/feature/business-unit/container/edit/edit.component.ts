import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBusinessUnitForm } from '../../models/business-unit.models';
import { BusinessUnitService } from '../../services/business-unit.service';
import { AdalService } from 'adal-angular4';
import { NotificationsService } from 'angular2-notifications';
import { BusinessUnitConstants } from '../../constants/business-unit.constants';

@Component({
  selector: 'dpdhl-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  businessUnitData: IBusinessUnitForm;
  BUHeadStatus: boolean = false;
  BUGroups: any;
  multipleEdit: any;
  editNavigation: boolean = false;

  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _businessUnitService: BusinessUnitService,
    private _adalService: AdalService,
    private _notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        this.businessUnitData = {
          id: data.resolveBUById.result[0].id,
          name: data.resolveBUById.result[0].name,
          shortName: data.resolveBUById.result[0].short_name,
          description: data.resolveBUById.result[0].description,
          owner: data.resolveBUById.result[0].owner,
          modifiedDate: this.getUTCDate(),
          createdDate: data.resolveBUById.result[0].created_date,
          userGroup: data.resolveBUById.result[0].usergroup_name,
          createdBy: data.resolveBUById.result[0].created_by,
          modifiedBy: this._adalService.userInfo.profile.given_name,
          imgData: data.resolveBUById.result[0].imgData
        };
        this.BUGroups = data.resolveBUGroup.value;
      }
    });
    this._businessUnitService.currentEditItems.subscribe(items => {
      this.multipleEdit = items;
    });
  }

  getUTCDate() {
    var d = new Date();
    var m = d.getUTCMonth() + 1;
    return d.getUTCDate() + '-' + m + '-' + d.getUTCFullYear();
  }

  updateBusinessUnit(formData) {
    let params = {
      id: formData.id,
      name: formData.name,
      shortName: formData.shortName,
      description: formData.description,
      owner: formData.owner,
      userGroup: formData.userGroup,
      createdBy: formData.createdBy,
      modifiedBy: formData.modifiedBy,
      filePath: formData.imgData
    };
    this._businessUnitService.updateBusinessUnit(formData).subscribe(res => {
      if (res) {
        // this.alertConfig = {
        //   message: 'BU Updated Successfully',
        //   visibility: true,
        //   status: true
        // };
        if (this.multipleEdit.length > 1) {
          let index = this.multipleEdit.indexOf(params.id);
          this.multipleEdit.splice(index, 1);
          this._router.navigate(['/business-unit/edit/', this.multipleEdit[0]]);
        } else {
          this.multipleEdit = [];
          this._notificationsService.success(BusinessUnitConstants.BU_Updated_Message);
          this._router.navigate(['/business-unit']);
        }
      }
    });
  }

  searchBUHead(buHead) {
    this.editNavigation = false;
    this._businessUnitService.searchBUUser(buHead).subscribe(res => {
      if (res && res.value && res.value.length == 1) {
        this.BUHeadStatus = false;
      } else {
        this.BUHeadStatus = true;
      }
    });
  }

  getBUGroup() {
    this._businessUnitService.getBUGroups().subscribe(res => {
      console.log(res);
    });
  }
}
