import { Component, OnInit, Inject } from '@angular/core';
import { DashboardConstants } from '../../constants/dashboard.constants';
import { AdalService } from 'adal-angular4';
import { DashboardService } from '../../service/dashboard.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'dpdhl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  viewApplicationPopup = false;
  viewAppdata;
  resourceFilter;
  resourceList;
  showTable: false;
  appOwnerList;
  showEmail = false;
  emailParams;
  sendMailForm: FormGroup;
  AngularEditorConfig: any;
  alertConfig: any = {
    message: '',
    visibility: false,
    status: false
  };
  displayedColumns: string[] = [
    'select',
    'owner',
    'appdata',
    'action'
  ];

  applicationList: any;
  configuration: any = {
    rowList: [10, 20, 50],
    action: true,
    primaryKey: 'name',
    dataColumnOptions: DashboardConstants.dataColumnOptions,
    actionOptions: {
      edit: false,
      delete: false,
      view: false,
      email: true
    },
    exportExcel: false,
    exportExcelName: 'Application.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  constructor(
    private _fb: FormBuilder,
    private _dashboardService: DashboardService,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
    this.getAppOwner();
    this.sendMailForm = this._fb.group({
      email: [
        { value: '', disabled: false },
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
          name: "quote",
          class: "quote",
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1",
        },
      ]
    };
  }


  getAppOwner() {
    this._dashboardService.getAppOwner().subscribe(res => {
      if (res) {
        var reformattedArray = res.result.map(obj => {
          let rObj = {};
          let applist;
          let name: string = '';
          let appNameLength: number;
          let applength: string;
          rObj['owner'] = obj.owner;

          //   if (obj.appdata.length > 3) {
          //     for (let i = 0; i < 3; i++) {
          //       name += obj.appdata[i].name + ',';
          //     }
          //   }
          //   else {
          //     for (let app of obj.appdata) {
          //       name += ' |' + ' ' + app.name + ' ';
          //     }
          //   }

          //   if (obj.appdata.length > 3) {
          //     applength = '+' + (obj.appdata.length - 3);
          //   } else { applength = ''; }

          //   rObj['appsOwned'] = name + applength;
          //   return rObj;
          // });
          // this.appOwnerList = res.result;
          if (obj.appdata.length > 1) {

            for (let i = 0; i < obj.appdata.length - 1; i++) {
              name += " " + obj.appdata[i].name + " " + ",";
            }
            let temp = obj.appdata[obj.appdata.length - 1];
            name += " " + temp.name;

          } else {
            let temp = obj.appdata[obj.appdata.length - 1];
            name = temp.name;
          }

          rObj['appdata'] = name;
          return rObj;
        });
        this.appOwnerList = reformattedArray;


      }
    });
  }


  email(email) {
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
    this._dashboardService.sendEmail(this.emailParams).subscribe(res => {
      if (res) {
        this.showEmail = false;
      }
    });
    this.sendMailForm.reset();
  }

}
