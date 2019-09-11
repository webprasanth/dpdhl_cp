import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdalService } from 'adal-angular4';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'dpdhl-app-owner',
  templateUrl: './app-owner.component.html',
  styleUrls: ['./app-owner.component.scss']
})
export class AppOwnerComponent implements OnInit {
  @Input() APPOwnerList: any;
  @Input() APPData: any;
  @Output() postEmail: EventEmitter<any> = new EventEmitter<any>();

  appOwnerList;
  showEmail = false;
  sendMailForm: FormGroup;
  emailParams;
  AngularEditorConfig: any;

  constructor(private _fb: FormBuilder, private _adalService: AdalService) {}

  ngOnInit() {
    this.sendMailForm = this._fb.group({
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email]
      ],
      cc: [''],
      subject: [''],
      content: ['']
    });
    this.AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '21rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
      translate: 'no',
      toolbarPosition: 'top',
      defaultFontName: 'Times New Roman',
      customClasses: [
        {
          name: 'quote',
          class: 'quote'
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1'
        }
      ]
    };
  }

  sendEmail(email) {
    this.sendMailForm.patchValue({
      email: email
    });
    this.showEmail = true;
  }

  submitEmail() {
    this.emailParams = {
      to: this.sendMailForm.get('email').value,
      from: this._adalService.userInfo.userName,
      subject: this.sendMailForm.get('subject').value,
      content: this.sendMailForm.get('content').value
    };
    this.postEmail.emit(this.emailParams);
    this.showEmail = false;
    this.sendMailForm.reset();
  }
}
