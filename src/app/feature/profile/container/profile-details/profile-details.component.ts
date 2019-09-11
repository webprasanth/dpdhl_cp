import { Component, OnInit, Inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IProfileForm } from '../../models/profile.models';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { NotificationsService } from 'angular2-notifications';
import { ProfileConstant } from '../../constants/profile.constants';

@Component({
  selector: 'dpdhl-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  myProfileData: IProfileForm;
  userProfileId: number;
  activeProfile: boolean;
  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  profileModified: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _profileService: ProfileService,
    private _notifications_service: NotificationsService
  ) {}

  ngOnInit() {
    this.activeProfile = false;
    this._route.data.subscribe(data => {
      console.log();
      this.myProfileData = {
        id: data.resolveMyProfile.result[0].id,
        firstname: data.resolveMyProfile.result[0].firstname,
        lastname: data.resolveMyProfile.result[0].lastname,
        designation: data.resolveMyProfile.result[0].designation,
        areaCode:
          data.resolveMyProfile.result[0].landline != null
            ? data.resolveMyProfile.result[0].landline.split('-')[0]
            : '',
        landline:
          data.resolveMyProfile.result[0].landline != null
            ? data.resolveMyProfile.result[0].landline.split('-')[1]
            : '',
        dateOfBirth: data.resolveMyProfile.result[0].dateofbirth,
        displayname: data.resolveMyProfile.result[0].displayname,
        countryCode:
          data.resolveMyProfile.result[0].mobile != null
            ? data.resolveMyProfile.result[0].mobile.split('-')[0]
            : '',
        mobile:
          data.resolveMyProfile.result[0].mobile != null
            ? data.resolveMyProfile.result[0].mobile.split('-')[1]
            : '',
        email: data.resolveMyProfile.result[0].email,
        gender: data.resolveMyProfile.result[0].gender,
        country: data.resolveMyProfile.result[0].country,
        state: data.resolveMyProfile.result[0].state,
        city: data.resolveMyProfile.result[0].city,
        street: data.resolveMyProfile.result[0].street,
        pincode: data.resolveMyProfile.result[0].pincode,
        entities: data.resolveMyProfile.result[0].entities,
        imgData: data.resolveMyProfile.result[0].imgData
      };
    });
  }

  reverseformatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month, day, year].join('-');
  }
  dob(event) {
    var dob = event;
    this.formatDate(dob);
    return this.formatDate(dob);
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  updateMyProfile(formData) {
    let dobValue = this.dob(formData.dateofbirth);
    let params = {
      id: formData.id,
      firstName: formData.firstname,
      lastName: formData.lastname,
      designation: formData.designation,
      mobile: formData.countryCode + '-' + formData.mobile,
      email: formData.email,
      country: formData.country,
      street: formData.street,
      state: formData.state,
      city: formData.city,
      entities: formData.entities,
      imgData: formData.imgData,
      displayName: formData.displayname,
      isDislayNamePrimary: true,
      gender: formData.gender,
      landLine: formData.areaCode + '-' + formData.landline,
      pincode: formData.pincode,
      dateOfBirth: dobValue,
      modifiedBy: 'Admin'
    };

    this._profileService.updateMyProfile(params).subscribe(res => {
      if (res) {
        this.alertConfig = {
          message: 'Profile Updated Successfully',
          visibility: true,
          status: true
        };
        this.getProfileDetails();
        this._notifications_service.success(ProfileConstant.Update_Message);
        this.profileModified = false;
        // this._router.navigate(['/profile']);
        // location.reload();
      }
    });
  }

  getProfileDetails() {
    this._profileService
      .getProfileUserById(this.myProfileData.id)
      .subscribe(res => {
        this.myProfileData = {
          id: res.result[0].id,
          firstname: res.result[0].firstname,
          lastname: res.result[0].lastname,
          designation: res.result[0].designation,
          areaCode:
            res.result[0].landline != null
              ? res.result[0].landline.split('-')[0]
              : '',
          landline:
            res.result[0].landline != null
              ? res.result[0].landline.split('-')[1]
              : '',
          dateOfBirth: res.result[0].dateofbirth,
          displayname: res.result[0].displayname,
          countryCode:
            res.result[0].mobile != null
              ? res.result[0].mobile.split('-')[0]
              : '',
          mobile:
            res.result[0].mobile != null
              ? res.result[0].mobile.split('-')[1]
              : '',
          email: res.result[0].email,
          gender: res.result[0].gender,
          country: res.result[0].country,
          state: res.result[0].state,
          city: res.result[0].city,
          street: res.result[0].street,
          pincode: res.result[0].pincode,
          entities: res.result[0].entities,
          imgData: res.result[0].imgData
        };
      });
  }
}
