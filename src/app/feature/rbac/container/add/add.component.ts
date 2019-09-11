import { Component, OnInit } from '@angular/core';
import { RbacService } from '../../services/rbac.service';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { RbacConstants } from '../../constants/rbac.constants';
import { IApplicationList } from '../../models/rback-models';

@Component({
  selector: 'dpdhl-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  rbacObj;
  userGroup;
  rbacData;
  nameExist: boolean = false;
  constructor(
    private _adalService: AdalService,
    private _rbacService: RbacService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.rbckObj();
    this.getUserGroup();
    this.rbacData = {
      roleID: null,
      roleName: '',
      userGroupIDs: '',
      privilages: this.rbacObj
    };
  }
  rbckObj() {
    this.rbacObj = RbacConstants.rbacObj;
  }

  getUserGroup() {
    this._rbacService.getUserGroups().subscribe(res => {
      if (res) {
        this.userGroup = res.result;
      }
    });
  }

  createRbac(formData) {
    formData.createdBy = this._adalService.userInfo.profile.given_name;
    this._rbacService.saveConfig(formData).subscribe(res => {
      if (res) {
        this._notificationsService.success(RbacConstants.App_Message);
        this._router.navigate(['/rbac']);
      }
    });
  }

  roleNameVerification(name) {
    this._rbacService.getRbacConfigList().subscribe(res => {
      let index = res.result.findIndex(x => x.role_name === name);
      if (index > -1) {
        this.nameExist = true;
      } else {
        this.nameExist = false;
      }
    });
  }
}
