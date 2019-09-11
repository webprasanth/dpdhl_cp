import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUserForm } from '../../model/users-model';
import { Router } from '@angular/router';

@Component({
  selector: 'dpdhl-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() userDetails: IUserForm;
  @Input() BUList: any;
  @Input() editNavigation: boolean;
  @Input() BUHeadStatus: boolean;
  @Input() ResourceList: any;
  @Input() multipleEdit: any;
  @Input() slidesIndex: number;
  @Input() applicationList: any;
  @Output() editUserProfileFormData: EventEmitter<IUserForm> = new EventEmitter<
    IUserForm
    >();
  // @Output() checkEntityName: EventEmitter<any> = new EventEmitter<any>();
  userForm: FormGroup;
  appImage: string;
  fileUploadMessage: boolean;
  popUpVisibility: boolean = false;
  popUpConfig: any = {
    title: 'User Edit Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , Do you want to update user details?',
    rowThree:
      'Once you confirm, it will be updated with all the respective association.'
  };

  constructor(private _fb: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.userForm = this._fb.group({
      firstname: [this.userDetails.firstname, [Validators.required]],
      mobile_number: [this.userDetails.mobile_number],
      email: [this.userDetails.email, [Validators.required]],
      country: [this.userDetails.country],
      street: [this.userDetails.street],
      state: [this.userDetails.state],
      city: [this.userDetails.city],
      pincode: [this.userDetails.pincode],
      entities: [
        { value: this.userDetails.entities, disabled: true },
        this.userDetails.entities
      ],
      buID: [
        { value: this.userDetails.buID, disabled: true },
        this.userDetails.entities
      ],
      appId: [
        { value: this.userDetails.appID, disabled: true },
        this.userDetails
      ],
      imgData: [this.userDetails.imgData]
    });
    this.appImage = this.userDetails.imgData;
  }
  ngOnChanges() {
    if (this.editNavigation) {
      this.userForm = this._fb.group({
        firstname: [this.userDetails.firstname, [Validators.required]],
        mobile_number: [this.userDetails.mobile_number, [Validators.required]],
        email: [this.userDetails.email, [Validators.required]],
        gender: [this.userDetails.gender],
        country: [this.userDetails.country],
        state: [this.userDetails.state],
        city: [this.userDetails.city],
        pincode: [this.userDetails.pincode],
        street: [this.userDetails.street],
        entities: [this.userDetails.entities],
        buID: [this.userDetails],
        applicationId: [this.userDetails],
        imgData: [this.userDetails.imgData]
      });
      this.appImage = this.userDetails.imgData;
    }
  }
  handleUpload(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (event.target.result.length * 2 > 2 ** 21) {
          this.fileUploadMessage = true;
        } else {
          this.appImage = event.target.result;
          this.userForm.patchValue({ imgData: this.appImage });
          this.fileUploadMessage = false;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onSubmit() {
    // this.editUserProfileFormData.emit(this.userForm.getRawValue());
    // this.popUpConfig.rowOne = this.userDetails.firstname;
    if (this.userDetails.id > 0) {
      this.popUpConfig.rowOne = this.userDetails.firstname;
      this.popUpVisibility = true;
    } else {
      this.editUserProfileFormData.emit(this.userForm.getRawValue());
      this.popUpVisibility = false;
    }
  }

  popUpEvent(event) {
    if (event) {
      this.editUserProfileFormData.emit(this.userForm.getRawValue());
      this.popUpVisibility = false;
    } else if (!event) {
      this.popUpVisibility = false;
    }
  }
  decreaseEdit() {
    this.editNavigation = true;
    if (this.slidesIndex > 0) {
      this.slidesIndex--;
      this._router.navigate([
        '/users/edit/',
        this.multipleEdit[this.slidesIndex]
      ]);
    }
  }

  increaseEdit() {
    this.editNavigation = true;
    if (this.slidesIndex < this.multipleEdit.length - 1) {
      this.slidesIndex++;
      this._router.navigate([
        '/users/edit/',
        this.multipleEdit[this.slidesIndex]
      ]);
    }
  }

  searchEntityName() { }
}
