import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { IBusinessUnitList } from '../../models/business-unit.models';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessUnitService } from 'src/app/feature/business-unit/services/business-unit.service';
import { BusinessUnitConstants } from '../../constants/business-unit.constants';
import { NotificationsService } from 'angular2-notifications';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { debuglog } from 'util';
@Component({
  selector: 'dpdhl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  componentRoles;
  privilages;
  role;
  routerLinkActiveOptions: {
    exact: boolean;
  };
  displayedColumns: string[] = [
    'select',
    'name',
    'description',
    'owner',
    'created_date',
    'created_by',
    // 'usergroup_name',
    'action'
  ];
  buList: Array<IBusinessUnitList>;
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'name',
    dataColumnOptions: BusinessUnitConstants.dataColumnOptions,
    actionOptions: {
      edit: true,
      delete: true
    },
    exportExcel: true,
    exportExcelName: 'BusinessUnit.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };

  popUpConfig: any = {
    title: 'BU Delete Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to delete Business Unit details?',
    rowThree:
      'Once you confirm, it will be deleted with all the respective association.'
  };

  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _businessUnitService: BusinessUnitService,
    private _notificationsService: NotificationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        this.buList = data.resolveBUList.result;
      }
    });
    this._businessUnitService.updateEditItems([]);
    /***********privilages******* */
    this.privilages = this.storage.get('privileges');
    this.componentRoles = this.serchPrivilage('business_Unit');
    this.role = this.componentRoles[0].rights[0];

    this.configuration.exportExcel = this.role.export;
    this.configuration.actionOptions = {
      edit: this.role.edit,
      delete: this.role.delete
    }
    /****************************** */

  }
  serchPrivilage(searchName) {
    return this.privilages[0].filter(obj => {

      return (obj.role == searchName);
    });
  }

  getBusinessUnit() {
    this._businessUnitService.getBusinessUnit().subscribe(res => {
      if (res) {
        this.buList = res.result;
      }
    });
  }

  deleteBusinessUnit(id) {
    if (id.length > 1) {
      var finalArray = id.map(function (obj) {
        return obj.id;
      });
      for (var i = 0; i < finalArray.length; i++) {
        this._businessUnitService
          .deleteBusinessUnit(finalArray[i])
          .subscribe(res => {
            if (res) {
              this.getBusinessUnit();
            }
          });
      }
      this._notificationsService.success(
        BusinessUnitConstants.BU_Deleted_Message
      );
    } else {
      this._businessUnitService.deleteBusinessUnit(id).subscribe(res => {
        if (res) {
          this.getBusinessUnit();
          this._notificationsService.success(
            BusinessUnitConstants.BU_Deleted_Message
          );
        }
      });
    }
  }

  editBusinessUnit(id) {
    if (id.length > 1) {
      var finalArray = id.map(function (obj) {
        return obj.id;
      });
      this._businessUnitService.updateEditItems(finalArray);
      this._router.navigate(['/business-unit/edit/', finalArray[0]]);
    } else {
      this._router.navigate(['/business-unit/edit/', id]);
    }
  }
}
