import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'dpdhl-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit {
  @Input() formStatus: boolean;
  @Input() existuser: boolean;

  @Output() checkExtUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() inviteExtUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() uploadExtUser: EventEmitter<any> = new EventEmitter<any>();

  inviteExternalForm: FormGroup;
  fileInput;
  errorMessage: boolean;
  // existuser: boolean = false;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.inviteExternalForm = this._fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required]],
      phone: ['']
    });
  }

  ngOnChanges() {
    if (this.formStatus == true) {
      this.inviteExternalForm.reset();
    }
  }

  checkAddedUser() {
    // let index = this.userList.findIndex(
    //   x => x.email_id == this.inviteExternalForm.controls['emailId'].value
    // );
    // if (index > -1) {
    //   this.existuser = true;
    // } else {
    //   this.existuser = false;
    // }
    this.checkExtUser.emit(this.inviteExternalForm.controls['emailId'].value);
  }

  sendInvite() {
    this.inviteExtUser.emit(this.inviteExternalForm.getRawValue());
    this.inviteExternalForm.reset();
  }

  onFileChange(ev) {
    let workBook = null;

    let jsonData = null;

    const reader = new FileReader();

    const file = ev.target.files[0];

    reader.onload = event => {
      const data = reader.result;

      workBook = XLSX.read(data, { type: 'binary' });
      let bookName = [];
      workBook.SheetNames.forEach(function(sheetName) {
        bookName.push(sheetName);
      });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];

        initial[name] = XLSX.utils.sheet_to_json(sheet);

        return initial;
      }, {});

      let exportData = { data: jsonData[bookName[0]] };

      this.uploadExtUser.emit(exportData.data);
    };

    reader.readAsBinaryString(file);
  }

  uploadBulkExtUser() {
    this.uploadExtUser.emit(this.fileInput.data);
    this.fileInput.data = '';
  }
}
