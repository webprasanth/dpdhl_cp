import { Component, OnInit, Inject } from '@angular/core';
import { RbacService } from '../../services/rbac.service';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { RbacConstants } from '../../constants/rbac.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  appList: any;
  appId: any;
  rolesList: any;
  fuctionList: any;
  applicationForm: FormGroup;
  addResponsibilityParams;
  addSubFunctionParams;
  functionalities;
  activityName;
  roleId;
  activityId;

  Roles;
  functions;
  showNewRole;
  roleConfirmSuccess;
  addParam;
  popupInput = '';

  options = ['Read/View', 'Create/Generate', 'Edit/Update', 'Remove/Delete'];
  optionsMap = {
    'Read/View': true,
    'Create/Generate': true,
    'Edit/Update': true,
    'Remove/Delete': true
  };
  optionsChecked = [];


  constructor(private _adalService: AdalService,
    private _route: ActivatedRoute,
    private _rbckService: RbacService,
    private _router: Router,
    private _fb: FormBuilder,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _notificationsService: NotificationsService) { }


  ngOnInit() {
    this.applicationForm = this._fb.group({
      app: ['', [Validators.required]],
      roles: ['', [Validators.required]],
      activity: ['', [Validators.required]],
      subActivity: ['', [Validators.required]],
      popupInput: ['']

    });
    this.getApplication();
    this.getRoles('Application');
    this.getResponsibility('Application');
  }

  get formCtrl() { return this.applicationForm.controls; }
  getApplication() {
    let params = {
      'userRole': this.storage.get('UserRole'),
      'userEmailID': this._adalService.userInfo.userName
    }
    this._rbckService.getApplication(params).subscribe(res => {
      if (res) {
        this.appList = res.result;
      }
    });
  }
  onAppSelect(event) {
    this.appId = event.id;
    this.getRolesById(this.appId);
    this.getActivity(this.appId);
  }
  onActivitySelect(event) {
    this.activityName = event.activity_name;
    this.activityId = event.id
  }
  getRoles(Application) {
    this._rbckService.getRoles(Application).subscribe(res => {
      if (res) {

        this.Roles = res.result;
      }
    });
  }
  getRolesById(id) {
    this._rbckService.getRolesById(id).subscribe(res => {
      if (res) {
        this.rolesList = res.result;
      }
    });
  }
  getActivity(id) {
    this._rbckService.getResponsibilityById(id).subscribe(res => {
      if (res) {
        this.fuctionList = res.result;
      }
    });
  }
  getResponsibility(Platform) {
    this._rbckService.getResponsibility(Platform).subscribe(res => {
      if (res) {
        this.functionalities = res.result;
      }
    });
  }
  addRoles() {
    this.showNewRole = false;
    let params =
      {
        roleName: this.popupInput,
        roleCategory: 'Application'
      }

    this._rbckService.addRoles(params).subscribe(res => {
      if (res) {
        this.getRolesById(this.appId);
        this.getRoles('Application');
      }
    });
  }

  addResponsibility() {
    this.addResponsibilityParams = {
      activityName: this.popupInput,
      appID: this.appId,
      activityType: 'Application'
    }
    this._rbckService.addResponsibility(this.addResponsibilityParams).subscribe(res => {
      if (res) {

        this.getResponsibility('Application');

      }
    });
  }

  addSubFunction() {
    this.addSubFunctionParams = {
      activityName: this.activityName,
      appID: this.appId,
      activityType: 'Application',
      subActivity: this.popupInput
    }

    this._rbckService.addSubFunction(this.addSubFunctionParams).subscribe(res => {
      if (res) {
        this.fuctionList = res.result;
      }
    });
  }

  addfunction(param) {
    this.showNewRole = true;
    this.addParam = param;

  }
  add() {

    this.showNewRole = false;
    if (this.addParam == 'Role') {
      this.addRoles()
    } else if (this.addParam == 'Functionality') {
      this.addResponsibility();
    } else if (this.addParam == 'Sub Functionality') {
      this.addSubFunction();
    }
  }

  saveConfig() {
    let saveParams = {
      activityID: this.activityId,
      roleID: this.roleId,
      createAccess: this.optionsMap['Create/Generate'],
      readAccess: this.optionsMap['Read/View'],
      updateAccess: this.optionsMap['Edit/Update'],
      deleteAccess: this.optionsMap['Remove/Delete']
    }

    this._rbckService.saveConfig(saveParams).subscribe(res => {
      if (res) {
        this._notificationsService.success(RbacConstants.App_Message);
        this._router.navigate([
          '/rbac/list']);
      }
    });
  }
  onRoleSelect(event) {
    this.roleId = event.id;
  }
  onFunctionalitySelect(event) {
    this.activityId = event.id
  }
  onInput(event) {
    this.popupInput = event;
  }

  /************check box functionalities***********/
  initOptionsMap() {
    for (var x = 0; x < 4; x++) {
      this.optionsMap[this.options[x]] = true;
    }
  }
  updateCheckedOptions(option, event) {
    this.optionsMap[option] = event.target.checked;
  }
  updateOptions() {
    for (var x in this.optionsMap) {
      if (this.optionsMap[x]) {
        this.optionsChecked.push(x);
      }

    }
    this.options = this.optionsChecked;
    this.optionsChecked = [];

  }

}
