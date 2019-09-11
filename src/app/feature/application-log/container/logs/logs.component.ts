import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationLogConstants } from '../../constants/application-log-constants';

@Component({
  selector: 'dpdhl-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'count', 'timestamp'];
  logsList: Array<any>;
  configuration: any = {
    rowList: [10, 20, 50],
    action: false,
    primaryKey: 'name',
    dataColumnOptions: ApplicationLogConstants.dataColumnOptions,
    actionOptions: {
      edit: false,
      delete: false
    },
    exportExcel: true,
    exportExcelName: 'BusinessUnit.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.logsList = data.resolveLogList.value;
    });
  }
}
