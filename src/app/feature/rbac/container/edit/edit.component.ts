import { Component, OnInit, Input, Inject } from '@angular/core';
import { RbacService } from '../../services/rbac.service';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { RbacConstants } from '../../constants/rbac.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editID;
  rbacObj;
  userGroup;
  rbacData;

  constructor(
    private _adalService: AdalService,
    private _route: ActivatedRoute,
    private _rbacService: RbacService,
    private _router: Router,
    private _fb: FormBuilder,
    private _notificationsService: NotificationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        this.rbacObj = data.resolveRbacById.result[0].privilege;
        this.rbacData = {
          roleID: data.resolveRbacById.result[0].id,
          roleName: data.resolveRbacById.result[0].role_name,
          userGroupIDs: data.resolveRbacById.result[0].user_group_ids,
          privilages: data.resolveRbacById.result[0].privilege
        };
        this.getUserGroup();
      }
    });
  }

  getUserGroup() {
    let param = {
      userGroupIDs: this.rbacData.userGroupIDs
    };
    this._rbacService.getUserGroupsEdit(param).subscribe(res => {
      if (res) {
        this.userGroup = res.result;
      }
    });
    // let params = {
    //   userRole: this.storage.get('UserRole'),
    //   userEmailID: this._adalService.userInfo.userName
    // };
    // this._rbacService.getAllUserGroup(params).subscribe(res => {
    //   if (res) {
    //     this.userGroup = res.result;
    //   }
    // });
  }

  updateRbac(formData) {
    formData.createdBy = this._adalService.userInfo.profile.given_name;
    this._rbacService.saveConfig(formData).subscribe(res => {
      if (res) {
        this._notificationsService.success(RbacConstants.App_Message);
        this._router.navigate(['/rbac']);
      }
    });
  }
}
