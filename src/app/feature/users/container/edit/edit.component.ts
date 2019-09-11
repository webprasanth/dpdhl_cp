import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserForm } from '../../model/users-model';
import { UsersService } from '../../services/users.service';
import { NotificationsService } from 'angular2-notifications';
import { UserConstant } from '../../constants/users-constants';

@Component({
  selector: 'dpdhl-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userDetails: IUserForm;
  slidesIndex: number = 0;
  editNavigation: boolean = false;
  BUList: any;
  applicationList: any;
  multipleEdit: any;
  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsersService,
    private _notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (data) {
        this.userDetails = {
          id: data.resolveUsedId.result[0].id,
          firstname: data.resolveUsedId.result[0].firstname,
          mobile_number: data.resolveUsedId.result[0].mobile,
          email: data.resolveUsedId.result[0].email,
          gender: data.resolveUsedId.result[0].gender,
          country: data.resolveUsedId.result[0].country,
          state: data.resolveUsedId.result[0].state,
          city: data.resolveUsedId.result[0].city,
          pincode: data.resolveUsedId.result[0].pincode,
          street: data.resolveUsedId.result[0].street,
          entities: data.resolveUsedId.result[0].entities.appName,
          imgData: data.resolveUsedId.result[0].imgData,
          buID: data.resolveUsedId.result[0].entities.buID,
          appID: data.resolveUsedId.result[0].entities.appID
        };
        // this.BUList = data.resolveBUList.result;
        // this.applicationList = data.resolveApplicationList.result;
      }
    });
    this._userService.currentEditItems.subscribe(items => {
      this.multipleEdit = items;
    });
  }

  updateUser(formData) {
    let params = {
      id: this.userDetails.id,
      firstName: formData.firstname,
      mobile: formData.mobile_number,
      email: formData.email,
      country: formData.country,
      street: formData.street,
      state: formData.state,
      city: formData.city,
      entities: formData.entities,
      pincode: formData.pincode,
      modifiedBy: 'Admin',
      imgData: formData.imgData
    };

    this._userService.updateUser(params).subscribe(res => {
      if (res) {
        if (this.multipleEdit.length > 1) {
          let index = this.multipleEdit.indexOf(params.id);
          this.multipleEdit.splice(index, 1);
          this.editNavigation = true;
          this._router.navigate(['/users/edit/', this.multipleEdit[0]]);
          this.slidesIndex = 0;
        } else {
          this.multipleEdit = [];
          this._notificationsService.success(UserConstant.User_Updated_Message);
          this._router.navigate(['/users']);
        }
      }
    });
  }
}
