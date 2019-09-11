import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { IBusinessUnitForm } from '../../models/business-unit.models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'dpdhl-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  businessUnitForm: FormGroup;
  popUpConfig: any = {
    title: 'BU Edit Confirmation',
    rowOne: '',
    rowTwo: 'Are you sure , do you want to update Business Unit details?',
    rowThree:
      'Once you confirm, it will be updated with all the respective association.'
  };
  popUpVisibility: boolean = false;
  fileUploadMessage: boolean = false;
  slidesIndex: number = 0;

  @Input() businessUnitData: IBusinessUnitForm;
  @Input() BUHeadStatus: boolean;
  @Input() BUGroups: any;
  @Input() multipleEdit: any;
  @Input() editNavigation: boolean;
  @Output() businessUnitFormData: EventEmitter<
    IBusinessUnitForm
  > = new EventEmitter<IBusinessUnitForm>();
  @Output() checkBUHead: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _fb: FormBuilder, private _router: Router) {}

  profileImage: string;

  ngOnInit() {
    // console.log("this.businessUnitData.createdDate >>>", this.businessUnitData.createdDate);

    this.businessUnitForm = this._fb.group({
      id: [this.businessUnitData.id, [Validators.required]],
      name: [this.businessUnitData.name, [Validators.required]],
      shortName: [this.businessUnitData.shortName],
      description: [this.businessUnitData.description],
      owner: [
        this.businessUnitData.owner,
        [Validators.required, Validators.email]
      ],
      modifiedDate: [
        { value: this.businessUnitData.modifiedDate, disabled: true }
      ],
      createdDate: [
        { value: this.businessUnitData.createdDate, disabled: true }
      ],
      createdBy: [{ value: this.businessUnitData.createdBy, disabled: true }],
      modifiedBy: [{ value: this.businessUnitData.modifiedBy, disabled: true }],
      userGroup: [this.businessUnitData.userGroup],
      imgData: [this.businessUnitData.imgData]
    });
    this.profileImage = this.businessUnitData.imgData;
  }

  ngOnChanges() {
    if (this.editNavigation) {
      this.businessUnitForm = this._fb.group({
        id: [this.businessUnitData.id, [Validators.required]],
        name: [this.businessUnitData.name, [Validators.required]],
        shortName: [this.businessUnitData.shortName, [Validators.required]],
        description: [this.businessUnitData.description],
        owner: [
          this.businessUnitData.owner,
          [Validators.required, Validators.email]
        ],
        modifiedDate: [
          { value: this.businessUnitData.modifiedDate, disabled: true }
        ],
        createdDate: [
          { value: this.businessUnitData.createdDate, disabled: true }
        ],
        createdBy: [{ value: this.businessUnitData.createdBy, disabled: true }],
        modifiedBy: [
          { value: this.businessUnitData.modifiedBy, disabled: true }
        ],
        userGroup: [this.businessUnitData.userGroup],
        imgData: [this.businessUnitData.imgData]
      });
      this.profileImage = this.businessUnitData.imgData;
    }
  }
  get formCtrl() {
    return this.businessUnitForm.controls;
  }
  checkBUHeadOnSearch(value) {
    if (!this.businessUnitForm.get('owner').errors) {
      this.checkBUHead.emit(this.businessUnitForm.get('owner').value);
    }
  }

  handleUpload(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (event.target.result.length * 2 > 2 ** 21) {
          this.fileUploadMessage = true;
        } else {
          this.profileImage = event.target.result;
          this.businessUnitForm.patchValue({ imgData: this.profileImage });
          this.businessUnitForm.markAsDirty();
          this.fileUploadMessage = false;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  searchBUOwner() {
    this.checkBUHead.emit(this.businessUnitForm.get('owner').value);
  }

  onSubmit() {
    if (this.businessUnitData.id > 0) {
      this.popUpConfig.rowOne = this.businessUnitData.name;
      this.popUpVisibility = true;
    } else {
      this.businessUnitFormData.emit(this.businessUnitForm.getRawValue());
    }
  }

  popUpEvent(event) {
    if (event) {
      this.businessUnitFormData.emit(this.businessUnitForm.getRawValue());
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
        '/business-unit/edit/',
        this.multipleEdit[this.slidesIndex]
      ]);
    }
  }

  increaseEdit() {
    this.editNavigation = true;
    if (this.slidesIndex < this.multipleEdit.length - 1) {
      this.slidesIndex++;
      this._router.navigate([
        '/business-unit/edit/',
        this.multipleEdit[this.slidesIndex]
      ]);
    }
  }
}
