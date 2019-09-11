import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserConstant } from '../../constants/users-constants';

@Component({
  selector: 'dpdhl-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  @Input() viewUserDetails: any;
  @Output() closeView: EventEmitter<boolean> = new EventEmitter<boolean>();

  displayedColumns: string[] = [
    'select',
    'first_name',
    'email_id',
    'parent_name',
    'is_exists',
    'created_by',
    'created_date'
  ];
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'user_group_name',
    dataColumnOptions: UserConstant.dataColumnOptionsUserGroupView,
    actionOptions: {
      edit: true,
      delete: true,
      view: true
    },
    exportExcel: true,
    exportExcelName: 'UsersGroupList.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };

  constructor() {}
  ngOnInit() {}
  closePopup() {
    this.closeView.emit(false);
  }
}
