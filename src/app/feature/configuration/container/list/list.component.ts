import { Component, OnInit, Inject } from '@angular/core';
import { ConfigurationConstants } from '../../constants/configuration-contants';
import { ConfigurationService } from '../../services/configuration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'dpdhl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  componentRoles;
  privilages;
  role;
  displayedColumns: string[] = [
    'select',
    'service_provider',
    'api_url',
    'protocol',
    'is_iot_ready',
    'is_power_enabled',
    'created_by',
    'created_date',
    'action'
  ];
  deviceSpecList: Array<any>;
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'service_provider',
    dataColumnOptions: ConfigurationConstants.dataColumnOptions,
    actionOptions: {
      edit: true,
      delete: false,
      view: false
    },
    exportExcel: true,
    exportExcelName: 'ServiceProvider.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  popUpConfig: any = {
    title: 'Application Delete Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to delete Application details?',
    rowThree:
      'Once you confirm, it will be deleted with all the respective association.'
  };
  constructor(
    private _configurationService: ConfigurationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notificationsService: NotificationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.deviceSpecList = data.resolveDeviceSpec.result;
    });
    /***********privilages******* */
    this.privilages = this.storage.get('privileges');
    this.componentRoles = this.serchPrivilage('deviceConfig');
    this.role = this.componentRoles[0].rights[0];

    this.configuration.exportExcel = this.role.export;
    this.configuration.actionOptions = {
      edit: this.role.edit
    };
    /****************************** */
  }
  serchPrivilage(searchName) {
    return this.privilages[0].filter(obj => {
      return obj.role == searchName;
    });
  }
  editDeviceSpec(id) {
    if (id.length > 1) {
      var finalArray = id.map(function(obj) {
        return obj.id;
      });
      this._configurationService.updateEditItems(finalArray);
      this._router.navigate(['/configuration/edit/', finalArray[0]]);
    } else {
      this._router.navigate(['/configuration/edit/', id]);
    }
  }
}
