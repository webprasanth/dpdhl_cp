import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from '../../services/business-unit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IBusinessUnitForm } from '../../models/business-unit.models';
import { AdalService } from 'adal-angular4';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { BusinessUnitConstants } from '../../constants/business-unit.constants';
@Component({
  selector: 'dpdhl-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  businessUnitData: IBusinessUnitForm;
  BUHeadStatus: boolean = false;
  BUGroups: any;
  editNavigation: boolean = false;
  testCaseVariable: boolean = false;

  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };

  constructor(
    private _businessUnitService: BusinessUnitService,
    private _router: Router,
    private _adalService: AdalService,
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService
  ) {}
  ngOnInit() {
    this.businessUnitData = {
      id: 0,
      name: '',
      shortName: '',
      description: '',
      owner: '',
      modifiedDate: '',
      createdDate: this.getUTCDate(),
      userGroup: '',
      createdBy: this._adalService.userInfo.profile.given_name,
      modifiedBy: this._adalService.userInfo.profile.given_name,
      imgData: ''
    };
    this._route.data.subscribe(data => {
      this.BUGroups = data.resolveBUGroup.value;
    });
  }

  getUTCDate() {
    var d = new Date();
    var m = d.getUTCMonth() + 1;
    return d.getUTCDate() + '-' + m + '-' + d.getUTCFullYear();
  }

  createBusinessUnit(formData) {
    console.log('create business unit initiated');
    this._businessUnitService.createBusinessUnit(formData).subscribe(res => {
      if (res) {
        console.log('create business unit successful');
        this._notificationsService.success(
          BusinessUnitConstants.CONST_CREATESUCCESSMSG
        );
        this._router.navigate(['/business-unit']);
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
      this.testCaseVariable = true;
      console.log('Get groups response');
    });
  }
}
