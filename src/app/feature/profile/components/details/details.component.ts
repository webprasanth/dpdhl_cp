import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl
} from '@angular/forms';
import { IProfileForm } from '../../models/profile.models';
import { NotificationsService } from 'angular2-notifications';
import { ProfileConstant } from '../../constants/profile.constants';
import * as moment from 'moment';
@Component({
  selector: 'dpdhl-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() profileModified: boolean;
  profileFormData: FormGroup;
  fileUploadMessage: boolean;
  popUpVisibility: boolean = false;
  profileUpdated = false;
  isDisabled: boolean = true;
  appImage: string;
  imgUpload: boolean = false;
  // profileModified: boolean = false;

  @Input() myProfileData: IProfileForm;
  @Output() myProfileUpdate: EventEmitter<IProfileForm> = new EventEmitter<
    IProfileForm
  >();

  maxDate = new Date(2000, 0, 1);
  // minDate = new Date(2020, 0, 1);
  constructor(
    private _fb: FormBuilder,
    private notifications_service: NotificationsService
  ) {}
  ngOnInit() {
    this.profileFormData = this._fb.group({
      id: [this.myProfileData.id, [Validators.required]],
      firstname: [
        { value: this.myProfileData.firstname, disabled: this.isDisabled },
        [Validators.required]
      ],
      lastname: [
        { value: this.myProfileData.lastname, disabled: this.isDisabled }
      ],
      gender: [{ value: this.myProfileData.gender, disabled: this.isDisabled }],
      areaCode: [
        { value: this.myProfileData.areaCode, disabled: this.isDisabled },
        [Validators.maxLength(4), Validators.minLength(2)]
      ],
      landline: [
        { value: this.myProfileData.landline, disabled: this.isDisabled },
        [Validators.maxLength(8), Validators.minLength(2)]
      ],
      dateofbirth: [
        { value: this.myProfileData.dateOfBirth, disabled: this.isDisabled }
      ],
      designation: [
        { value: this.myProfileData.designation, disabled: this.isDisabled }
      ],
      displayname: [
        { value: this.myProfileData.displayname, disabled: this.isDisabled }
      ],
      email: [
        { value: this.myProfileData.email, disabled: true },
        [Validators.required, Validators.email]
      ],
      countryCode: [
        { value: this.myProfileData.countryCode, disabled: this.isDisabled },
        [Validators.maxLength(3), Validators.minLength(2)]
      ],
      mobile: [
        { value: this.myProfileData.mobile, disabled: this.isDisabled },
        [Validators.maxLength(12), Validators.minLength(10)]
      ],
      country: [
        { value: this.myProfileData.country, disabled: this.isDisabled }
      ],
      state: [{ value: this.myProfileData.state, disabled: this.isDisabled }],
      city: [{ value: this.myProfileData.city, disabled: this.isDisabled }],
      street: [{ value: this.myProfileData.street, disabled: this.isDisabled }],
      pincode: [
        { value: this.myProfileData.pincode, disabled: this.isDisabled }
      ],
      entities: [
        { value: this.myProfileData.entities, disabled: this.isDisabled }
      ],
      imgData: [
        { value: this.myProfileData.imgData, disabled: this.isDisabled }
      ]
    });
    this.appImage = this.myProfileData.imgData;
  }

  ngOnChanges() {
    if (this.myProfileData) {
      this.profileModified = false;
      this.profileFormData.get('lastname').disable();
      this.profileFormData.get('gender').disable();
      this.profileFormData.get('areaCode').disable();
      this.profileFormData.get('landline').disable();
      this.profileFormData.get('dateofbirth').disable();
      this.profileFormData.get('designation').disable();
      this.profileFormData.get('displayname').disable();
      this.profileFormData.get('countryCode').disable();
      this.profileFormData.get('mobile').disable();
      this.profileFormData.get('country').disable();
      this.profileFormData.get('state').disable();
      this.profileFormData.get('city').disable();
      this.profileFormData.get('street').disable();
      this.profileFormData.get('pincode').disable();
      this.profileFormData.get('imgData').disable();
    }
  }

  enableEditing() {
    this.imgUpload = true;
    this.profileModified = true;
    this.profileFormData.get('lastname').enable();
    this.profileFormData.get('gender').enable();
    this.profileFormData.get('areaCode').enable();
    this.profileFormData.get('landline').enable();
    this.profileFormData.get('dateofbirth').enable();
    this.profileFormData.get('designation').enable();
    this.profileFormData.get('displayname').enable();
    this.profileFormData.get('countryCode').enable();
    this.profileFormData.get('mobile').enable();
    this.profileFormData.get('country').enable();
    this.profileFormData.get('state').enable();
    this.profileFormData.get('city').enable();
    this.profileFormData.get('street').enable();
    this.profileFormData.get('pincode').enable();
    this.profileFormData.get('imgData').enable();
    // this.profileFormData.get('appImage').enable();
  }
  handleUpload(event) {
    this.imgUpload = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (event.target.result.length * 2 > 2 ** 21) {
          this.fileUploadMessage = true;
        } else {
          this.appImage = event.target.result;
          this.profileFormData.patchValue({ imgData: this.appImage });
          this.fileUploadMessage = false;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onSubmit() {
    this.myProfileUpdate.emit(this.profileFormData.getRawValue());
  }
  charValidator(control: AbstractControl): { [key: string]: any } | null {
    const valid = /^[a-z][a-z\s]*$/.test(control.value);
    return valid
      ? null
      : { invalidValue: { valid: false, value: control.value } };
  }
  AgeValidator(control: AbstractControl): { [key: string]: any } | null {
    const dob = control.value;
    var min = 18;
    var max = 70;
    const today = moment(new Date()).startOf('day');
    const userAge = today.diff(dob, 'years');
    console.log('userAge>>>>', userAge);
    if (
      userAge !== undefined &&
      (isNaN(userAge) || userAge < min || userAge > max)
    ) {
      return {
        age: '18+'
        // age: {
        //   'requiredAge': '18+',
        //   'currentAge': userAge
        // }
      };
    }
    return null;
  }
}
