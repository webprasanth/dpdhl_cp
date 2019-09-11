import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {
  @Input() userOnBoardData: any;
  @Input() BUHeadStatus: boolean;
  @Input() emailData: any;
  @Input() groupNameExists: any;
  @Input() successWindow: boolean;
  @Input() invitationNotAccepted: boolean;
  @Input() inviteUserPopup: boolean;
  @Input() userGroupExist: boolean;
  @Input() userGroupAvailable: boolean;

  @Output() selectedBU: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedChild: EventEmitter<any> = new EventEmitter<any>();
  @Output() registeredEmail: EventEmitter<any> = new EventEmitter<any>();
  @Output() addUserGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() verifyUserGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() inviteExternalUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() uploadBulkUserData: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchGroupEvent: EventEmitter<any> = new EventEmitter<any>();

  createGroupForm: FormGroup;
  inviteUserForm: FormGroup;
  step: boolean = true;
  userAdded: Array<any> = [];
  emailExist: boolean = false;
  showAddUser: boolean = false;
  addButton: boolean = true;
  treeView: any;
  selectedEntity: any;
  parentEntity: any;
  additionalUsers: any = [];
  removedUsers: any = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  ngOnInit() {
    if (this.userOnBoardData) {
      if (
        this.userOnBoardData.users &&
        this.userOnBoardData.users[0] !== null &&
        this.userOnBoardData.users.length > 0
      ) {
        this.userAdded = this.userOnBoardData.users;
      }
      this.createGroupForm = this._fb.group({
        emailId: [''],
        userGroupID: [this.userOnBoardData.userGroupID],
        userGroupName: [
          {
            value: this.userOnBoardData.userGroupName,
            disabled:
              this.userOnBoardData.userGroupName == 'Platform Admin' ||
              this.userOnBoardData.userGroupName == 'Application Admin'
                ? true
                : false
          },
          [Validators.required]
        ],
        oldParentID: [this.userOnBoardData.oldParentID],
        oldParentType: [this.userOnBoardData.oldParentType],
        parentID: [this.userOnBoardData.parentID],
        parentName: [
          {
            value: this.userOnBoardData.parentName,
            disabled: true
          }
        ],
        parentType: [this.userOnBoardData.parentType],
        grandParentID: [this.userOnBoardData.grandParentID],
        grandParentName: [this.userOnBoardData.grandParentName],
        grandParentType: [this.userOnBoardData.grandParentType],
        isParentIsEntity: [this.userOnBoardData.isParentIsEntity],
        createdBy: [this.userOnBoardData.createdBy],
        users: [this.userOnBoardData.users, [Validators.required]],
        appID: [this.userOnBoardData.appID],
        buID: [this.userOnBoardData.buID],
        newUsers: [],
        removedUsers: []
      });
    }
    this.inviteUserForm = this._fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required]],
      phone: ['']
    });
  }
  get formCtrl() {
    return this.createGroupForm.controls;
  }
  ngOnChanges() {
    if (this.selectedEntity) {
      let index = this.treeView.findIndex(
        val => val.id == this.selectedEntity.id
      );
      // this.treeView[index].children = this.childEntity;
    }
  }

  onParentSelect(value) {
    this.selectedEntity = value;
    this.selectedBU.emit(value);
  }

  onChildSelect(value) {
    if (value.type != 'Application') {
      this.createGroupForm.patchValue({
        application: value
      });
      this.selectedChild.emit(value);
    }
  }

  searchEmailId() {
    this.registeredEmail.emit(this.createGroupForm.get('emailId').value);
  }

  addUser() {
    var index = this.userAdded.findIndex(
      obj => obj.email == this.createGroupForm.get('emailId').value
    );
    if (index == -1) {
      if (this.userOnBoardData.userGroupID != 0) {
        let user = {
          firstname: this.emailData.displayName,
          email: this.emailData.mail,
          department: this.emailData.department
        };
        this.additionalUsers.push(user);
        this.userAdded.push(user);
        this.createGroupForm.patchValue({
          newUsers: this.additionalUsers
        });
      } else {
        let user = {
          firstname: this.emailData.displayName,
          email: this.emailData.mail,
          department: this.emailData.department
        };
        this.userAdded.push(user);
      }
      this.createGroupForm.patchValue({
        emailId: ''
      });
      this.emailData = '';
      this.emailExist = false;
      if (this.userOnBoardData.userGroupID == null) {
        this.createGroupForm.patchValue({
          users: this.userAdded
        });
      }
    } else {
      this.emailExist = true;
    }
  }

  removeAddedUser(i) {
    this.removedUsers.push(this.userAdded[i]);
    this.createGroupForm.patchValue({
      removedUsers: this.removedUsers
    });
    this.userAdded.splice(i, 1);
    this.createGroupForm.markAsDirty();
  }

  searchUserGroup() {
    this.verifyUserGroup.emit(this.createGroupForm.get('groupName').value);
  }

  userListNavigate() {
    this._router.navigate(['/users']);
  }

  sendInvite() {
    this.inviteExternalUser.emit(this.inviteUserForm.getRawValue());
    this.inviteUserPopup = false;
  }

  onSubmit() {
    // console.log(this.createGroupForm.getRawValue());
    this.addUserGroup.emit(this.createGroupForm.getRawValue());
  }
  bulkUploadData(data) {
    this.uploadBulkUserData.emit(data);
  }
  searchGroupName() {
    this.searchGroupEvent.emit(
      this.createGroupForm.controls['userGroupName'].value
    );
  }
}
