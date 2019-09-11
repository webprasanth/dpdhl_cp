import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { MatOption } from '@angular/material';

@Component({
  selector: 'dpdhl-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {
  @ViewChild('allSelected') private allSelected: MatOption;
  deviceList: any;
  intervalInSec: any;

  displayedColumns: string[] = [
    'select',
    'refreshStatus',
    'device_type_name',
    'device_group_name',
    'service_provider'
  ];
  displayedColumnsTemp: string[] = [];
  dataColumnOptions = [
    {
      title: 'Row Selection',
      property: 'select',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Status',
      property: 'refreshStatus',
      width: 60,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Device Type',
      property: 'device_type_name',
      width: 350,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Device Group Name',
      property: 'device_group_name',
      width: 350,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Service Provider',
      property: 'service_provider',
      width: 350,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];
  configuration: any = {
    rowList: [10, 20, 50],
    action: false,
    primaryKey: 'device_type_name',
    dataColumnOptions: this.dataColumnOptions,
    actionOptions: {
      edit: true,
      delete: true,
      setting: true
    },
    refresh: true,
    exportExcel: true,
    exportExcelName: 'DeviceMetaData.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  serviceProvider: string;
  statusApiList: any;
  sigfoxParam: any = {
    username: '',
    password: ''
  };
  constructor(
    private _route: ActivatedRoute,
    private _deviceService: DeviceService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.deviceList = data.resolveDeviceTypeByID.result[0].data;
      this.intervalInSec = Number(this.deviceList[0].interval_in_sec);
      var myObject = this.deviceList[0];
      var size = 0,
        key;
      for (key in myObject) {
        if (myObject.hasOwnProperty(key)) size++;
        this.serviceProvider = this.deviceList[0].service_provider;
        if (
          key != 'device_type_name' &&
          key != 'device_group_name' &&
          key != 'service_provider'
        ) {
          var frags = key.split('_');
          for (let i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
          }
          this.displayedColumnsTemp.push(frags.join(' '));
        }
      }
      this.sigfoxParam.username =
        data.resolveDeviceTypeByID.result[0].settings.username;
      this.sigfoxParam.password =
        data.resolveDeviceTypeByID.result[0].settings.password;
      this.deviceByAPI();
    });
  }

  onChange(select) {
    if (select.isUserInput) {
      let source = this.headerFunction(select.source.value);
      if (select.source.selected) {
        this.displayedColumns.push(source);
        let obj = {
          title: select.source.value,
          property: source,
          width: 150,
          visible: true,
          isNumber: false,
          isDate: false
        };
        this.dataColumnOptions.push(obj);
      } else if (!select.source.selected) {
        let dColumn = this.displayedColumns.findIndex(x => x === source);
        this.displayedColumns.splice(dColumn, 1);
        let dColumnOption = this.dataColumnOptions.findIndex(
          x => x.property === source
        );
        this.dataColumnOptions.splice(dColumnOption, 1);
      }
    }
  }

  headerFunction(str) {
    var frags = str.split(' ');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toLowerCase() + frags[i].slice(1);
    }
    return frags.join('_');
  }

  refreshData(event) {
    this.deviceByAPI();
  }

  deviceByAPI() {
    var currentSec = new Date().getTime() / 1000;
    if (this.serviceProvider == 'Sigfox') {
      this._deviceService.getDevicesByAPI(this.sigfoxParam).subscribe(
        res => {
          this.statusApiList = res.result.data;
          // let apilist = this.deviceList.find(val => {
          //   val.id ==
          // })
          let apilist = this.statusApiList.filter(o =>
            this.deviceList.find(o2 => {
              if (o.id === o2.id) {
                let diff = currentSec - new Date(o.lastCom).getTime() / 1000;
                if (diff > this.intervalInSec) {
                  o2.refreshStatus = 'Inactive';
                } else {
                  o2.refreshStatus = 'Active';
                }
              }
            })
          );

          //   var size = 0,
          //   key;
          // for (key in apilist) {
          //   if (apilist.hasOwnProperty(key)) size++;
          //   this.serviceProvider = this.deviceList[0].service_provider;
          //     var frags = key.split('_');
          //     for (let i = 0; i < frags.length; i++) {
          //       frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
          //     }
          //     this.displayedColumnsTemp.push(frags.join(' '));
          //   }
        },
        error => {
          // this._notificationService.error('Invalid Credentials');
        }
      );
    }
    // else if (
    //   this.serviceProvider == 'RPP - Red Pointlabs Platform'
    // ) {
    //   axios
    //     .get(this.serviceProviderURL.api_url, {
    //       headers: {
    //         'X-User-Email': param.email,
    //         'X-User-Token': param.token,
    //         'X-User-Project': param.project
    //       }
    //     })
    //     .then(res => {
    //       this.deviceAPIList = res.data.trackableObjects;
    //       if (this.deviceAPIList.length > 0) {
    //         this.deviceAPIListView = true;
    //       } else {
    //         this.deviceAPIListView = false;
    //       }
    //       this.matGridCreation(this.deviceAPIList[0]);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }

  toggleAllSelection(option) {
    console.log(this.allSelected);
    if (this.allSelected.selected) {
      var myObject = this.deviceList[0];
      var key;
      for (key in myObject) {
        let aa = option.indexOf(key);
        if (aa == -1) {
          this.displayedColumns.push(key);
          let obj = {
            title: this.headerFunction(key),
            property: key,
            width: 150,
            visible: true,
            isNumber: false,
            isDate: false
          };
          this.dataColumnOptions.push(obj);
        }
      }
    } else {
      var myObject = this.deviceList[0];
      var key;
      for (key in myObject) {
        if (
          key !== 'refreshStatus' &&
          key !== 'device_type_name' &&
          key !== 'device_group_name' &&
          key !== 'service_provider'
        ) {
          let dColumn = this.displayedColumns.findIndex(x => x === key);
          if (dColumn != -1) {
            this.displayedColumns.splice(dColumn, 1);
          }
          let dColumnOption = this.dataColumnOptions.findIndex(
            x => x.property === key
          );
          if (dColumnOption != -1) {
            this.dataColumnOptions.splice(dColumnOption, 1);
          }
        }
      }
    }
  }

  toggleDeAllSelection(option) {}
}
