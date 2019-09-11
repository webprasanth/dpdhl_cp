import { Component, OnInit } from '@angular/core';
import { RbacService } from '../../services/rbac.service';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { RbacConstants } from '../../constants/rbac.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dpdhl-role-mapping',
  templateUrl: './role-mapping.component.html',
  styleUrls: ['./role-mapping.component.scss']
})
export class RoleMappingComponent implements OnInit {
  roleMappingForm: FormGroup;
  parentEntities;
  userGroups;
  platformRoles;
  configuredRoles;
  userGroupID;
  roleID;
  mode;
  disableRoles;
  constructor(private _adalService: AdalService,
    private _route: ActivatedRoute,
    private _rbckService: RbacService,
    private _router: Router,
    private _fb: FormBuilder,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getTopLevelEntities();
    this.getConfiguredRoles();
    this.roleMappingForm = this._fb.group({
      parentEntity: ['', [Validators.required]],
      userGroupName: ['', [Validators.required]],
      platformRoles: ['', [Validators.required]]
    });
  }
  // get formCtrl() { return this.roleMappingForm.controls; }
  getTopLevelEntities() {
    this._rbckService.getTopLevelEntities().subscribe(res => {
      if (res) {
        this.parentEntities = res.result;
        // console.log('.............', this.parentEntities);
      }
    });

  }
  onParentEntitySelect(id) {
    // console.log('id...', id);
    this._rbckService.getUserGroup(id).subscribe(res => {
      if (res) {
        this.userGroups = res.result;
        // console.log('....parent.........', res);
      }
    });
  }
  onUserGroupSelect(event) {
    console.log(event);
    this.userGroupID = event;
    this._rbckService.getRoleMapping(event).subscribe(res => {
      if (res) {
        if (res.result[0]) {
          console.log('in if..');
          // this.roleID = res.result[0].role_id;
          this.mode = 'Update';
          console.log('res.result[0].role_name..', res.result[0].role_id);
          this.roleMappingForm.patchValue({ platformRoles: res.result[0].role_id });
          this.disableRoles = true;
        } else {
          console.log('in else');
          this.mode = 'Add';
          this.disableRoles = false;
        }
      }
    });
  }
  onRoleSelect(event) {
    this.roleID = event;
  }
  getConfiguredRoles() {
    this._rbckService.getConfiguredRoles().subscribe(res => {
      if (res) {

        this.configuredRoles = res.result;
      }
    });
  }
  onSave() {
    console.log('usergroup id..', this.roleMappingForm.get('userGroupName').value);

    let params = {
      "roleID": this.roleID,
      "userGroupID": this.userGroupID,
      "mode": this.mode,
      "createdBy": this._adalService.userInfo.profile.given_name
    }
    console.log('params..', params);


    this._rbckService.saveRoleMap(params).subscribe(res => {
      if (res) {
        this._notificationsService.success(RbacConstants.APP_ROLE_MAPPED);
        // console.log('......save.......', res);
      }
    });
  }
}
