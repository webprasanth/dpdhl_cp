import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RbacService } from '../../services/rbac.service';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { RbacConstants } from '../../constants/rbac.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dpdhl-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() rbacObj;
  @Input() userGroup;
  @Input() rbacData;
  @Input() nameExist: boolean;

  @Output() roleNameVerify: EventEmitter<any> = new EventEmitter<any>();
  @Output() rbacFormData: EventEmitter<any> = new EventEmitter<any>();

  roleMapForm: FormGroup;
  roleSearch;
  Roles;
  toppingList;

  constructor(
    private _adalService: AdalService,
    private _route: ActivatedRoute,
    private _rbckService: RbacService,
    private _router: Router,
    private _fb: FormBuilder,
    private _notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    console.log('user group ids..', this.rbacData.userGroupIDs);
    this.roleMapForm = this._fb.group({
      roleID: [this.rbacData.roleID],
      roleName: [
        {
          value: this.rbacData.roleName,
          disabled: this.rbacData.roleID > 0 ? true : false
        },
        [Validators.required]
      ],
      userGroupIDs: [
        {
          value: this.rbacData.userGroupIDs,
          disabled:
            this.rbacData.roleName == 'Platform Admin' ||
            this.rbacData.roleName == 'Application Admin' ||
            this.rbacData.roleName == 'Default App User Role'
        }
      ],
      privileges: this._fb.array(this.rbacObj)
    });
  }

  saveConfig() {
    console.log('form', this.roleMapForm.getRawValue());
    this.rbacFormData.emit(this.roleMapForm.getRawValue());
  }

  roleNameCheck() {
    this.roleNameVerify.emit(this.roleMapForm.controls['roleName'].value);
  }

  /************check box functionalities***********/

  updateCheckedOptions(option, role) {
    this.roleSearch = this.serchRole(role);

    var nameObj = this.roleSearch[0].rights[0];
    Object.keys(nameObj).forEach(function(key) {
      if (key == option.key) {
        if (nameObj[key]) {
          nameObj[key] = false;
        } else {
          nameObj[key] = true;
        }
      }
    });
  }

  serchRole(searchName) {
    return this.rbacObj.filter(obj => {
      return obj.role == searchName;
    });
  }
  cancel() {
    this._router.navigate(['/rbac']);
  }

  getCamelCase(key) {
    var frags = key.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }
}
