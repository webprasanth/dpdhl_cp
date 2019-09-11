import { Component, OnInit, ViewChild } from '@angular/core';
import { INotificaionList } from '../../models/notification-models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { NotificationConstants } from '../../constants/notifications-constants';
import { debuglog } from 'util';

@Component({
  selector: 'dpdhl-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  alertList;
  routerLinkActiveOptions: {
    exact: boolean;
  };
  // received_on: string;
  // title: string;
  // id: Number;
  // message: string;
  displayedColumns: string[] = [
    'severity',
    'name',
    'description',
    'resource',
    'resourceType',
    'state',
    'received_on'
  ];
  notificationList: Array<INotificaionList>;

  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'name',
    dataColumnOptions: NotificationConstants.dataColumnOptions,
    actionOptions: {
      edit: false,
      delete: true
    },
    refresh: false,
    exportExcel: false,
    exportExcelName: 'BusinessUnit.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };

  popUpConfig: any = {
    title: 'Notification Delete Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to delete notification details?',
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
    private _notificationService: NotificationService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(res => {
      if (res) {
        var mofifiedAlertList = res.resolveAlerts.value.map(obj => {
          let rObj = {};
          rObj['name'] = obj.name;
          rObj['description'] = obj.properties.essentials.description;
          rObj['state'] = obj.properties.essentials.alertState;
          rObj['resource'] = obj.properties.essentials.targetResourceName;
          rObj['resourceType'] = obj.properties.essentials.targetResourceType;
          rObj['received_on'] = obj.properties.essentials.lastModifiedDateTime;
          rObj['severity'] = obj.properties.essentials.severity;
          return rObj;
        });
        this.alertList = mofifiedAlertList;
      }
    });
  }

  deleteNotification(id) {}
}
