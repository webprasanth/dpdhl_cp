import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AD_CONFIG } from './../../../../../environments/environment';
import { AdalService } from 'adal-angular4';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-ext-invite',
  templateUrl: './ext-invite.component.html',
  styleUrls: ['./ext-invite.component.scss']
})
export class ExtInviteComponent implements OnInit {
  status: boolean = false;
  existuser: boolean = false;
  constructor(
    private _usersService: UsersService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notificationService: NotificationsService,
    private _adalService: AdalService
  ) {}

  ngOnInit() {}

  verifyRegisterEmail(email) {
    this._usersService.searchEmail(email).subscribe(res => {
      if (res && res.value && res.value.length == 0) {
        this.existuser = false;
      } else if (
        (res &&
          res.value &&
          res.value.length == 1 &&
          res.value[0].externalUserState == 'Accepted') ||
        res.value[0].userType == 'Member'
      ) {
        this.existuser = true;
      } else if (
        res &&
        res.value &&
        res.value.length == 1 &&
        res.value[0].externalUserState == 'PendingAcceptance'
      ) {
        this.existuser = false;
      } else {
        this.existuser = false;
      }
    });
  }

  inviteExternalUser(form) {
    let param = {
      invitedUserDisplayName: form.displayName,
      invitedUserLastName: '',
      invitedUserMailNickName: '',
      invitedUserMobilePhone: form.phone,
      invitedUserEmailAddress: form.emailId,
      sendInvitationMessage: true,
      inviteRedirectUrl: AD_CONFIG.redirectUri,
      inviteRedeemUrl: AD_CONFIG.redirectUri,
      invitedUserMessageInfo: {
        customizedMessageBody:
          'Invitied By ' + this._adalService.userInfo.userName,
        messageLanguage: 'string'
      }
    };
    this._usersService.inviteExternalUser(param).subscribe(res => {
      if (res) {
        // this._router.navigate(['/users']);
        this._notificationService.success('External User Invited Successfully');
      }
    });
  }

  uploadExternalUser(form) {
    form.map(item => {
      let param = {
        invitedUserDisplayName: item.FullName,
        invitedUserEmailAddress: item.email,
        invitedUserMobilePhone: item.mobile,
        invitedUserLastName: '',
        invitedUserMailNickName: '',
        sendInvitationMessage: true,
        inviteRedirectUrl: AD_CONFIG.redirectUri,
        inviteRedeemUrl: AD_CONFIG.redirectUri,
        invitedUserMessageInfo: {
          customizedMessageBody:
            'Invitied By ' + this._adalService.userInfo.userName,
          messageLanguage: 'string'
        }
      };
      this._usersService.inviteExternalUser(param).subscribe(res => {
        if (res) {
          // this._router.navigate(['/users']);
        }
      });
    });
    // this._router.navigate(['/users']);
    this._notificationService.success('External User Invited Successfully');
    this.status = true;
  }
}
