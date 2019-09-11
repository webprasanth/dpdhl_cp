import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'dpdhl-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {
  entityList: any;

  displayedColumns: string[] = ['entity_name', 'entity_type', 'name'];
  displayedColumnsTemp: string[] = [];
  dataColumnOptions = [
    {
      title: 'Entity Name',
      property: 'entity_name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Entity Type',
      property: 'entity_type',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    },
    {
      title: 'Name',
      property: 'name',
      width: 150,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'entity_name',
    dataColumnOptions: this.dataColumnOptions,
    actionOptions: {
      edit: true,
      delete: true,
      setting: true
    },
    exportExcel: true,
    exportExcelName: 'DeviceMetaData.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.entityList = data.resolveEntityMetaDataList.result;
      var myObject = this.entityList[0];
      var size = 0,
        key;
      for (key in myObject) {
        if (myObject.hasOwnProperty(key)) size++;
        if (key != 'entity_name' && key != 'entity_type' && key != 'name') {
          var frags = key.split('_');
          for (let i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
          }
          this.displayedColumnsTemp.push(frags.join(' '));
        }
      }
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
}
