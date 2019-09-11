import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  Inject
} from '@angular/core';
declare var jQuery: any;
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit, AfterViewInit {
  @Input() privilages: any;
  @Input() appuserRole: any;
  toggleMenu: boolean = false;
  navBarToggle: boolean = false;
  navBarToggleAdmin: boolean = false;
  ListRoles;
  // privilages;
  role;
  componentRoles;

  appRoles;
  appprivilages;
  appIcon = false;

  businessRoles;
  businessprivilages;
  businessIcon = false;

  deviceRoles;
  deviceprivilages;
  deviceIcon = false;

  userRoles;
  userprivilages;
  userIcon = false;

  entityRoles;
  entityprivilages;
  entityIcon = false;

  deviceConfigRoles;
  deviceConfigprivilages;
  deviceConfigIcon = false;
  buEntityIcon = false;
  count = true;

  // appuserRole;
  rbacIcon;

  constructor(
    private elementRef: ElementRef,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
    /***********privilages******* */

    this.appprivilages = this.serchPrivilage('application');
    if (this.appprivilages) {
      this.appRoles = this.appprivilages[0].rights[0];
      this.businessprivilages = this.serchPrivilage('business_Unit');
      this.businessRoles = this.businessprivilages[0].rights[0];

      this.deviceprivilages = this.serchPrivilage('device');
      this.deviceRoles = this.deviceprivilages[0].rights[0];

      this.userprivilages = this.serchPrivilage('user');
      this.userRoles = this.userprivilages[0].rights[0];

      this.entityprivilages = this.serchPrivilage('entities');
      this.entityRoles = this.entityprivilages[0].rights[0];

      this.deviceConfigprivilages = this.serchPrivilage('deviceConfig');
      this.deviceConfigRoles = this.deviceConfigprivilages[0].rights[0];

      if (this.businessRoles.business_unit_list_view) {
        this.businessIcon = true;
      }
      if (this.appRoles.application_list_view) {
        this.appIcon = true;
      }

      if (this.deviceRoles.device_list_view) {
        this.deviceIcon = true;
      }
      if (this.userRoles.user_list_view) {
        this.userIcon = true;
      }
      if (this.entityRoles.entities_list_view) {
        this.entityIcon = true;
      }
      if (this.deviceConfigRoles.deviceConfig_list_view) {
        this.deviceConfigIcon = true;
      }

      if (this.appuserRole == 'Platform Admin') {
        this.rbacIcon = true;
        this.deviceConfigIcon = true;
        this.buEntityIcon = true;
      }
      if (this.appuserRole == 'Application Admin') {
        this.deviceConfigIcon = true;
      }
    }
    /****************************** */
  }

  ngOnChanges() {

    this.appprivilages = this.serchPrivilage('application');
    if (this.appprivilages) {

      this.appRoles = this.appprivilages[0].rights[0];

      this.businessprivilages = this.serchPrivilage('business_Unit');
      this.businessRoles = this.businessprivilages[0].rights[0];

      this.deviceprivilages = this.serchPrivilage('device');
      this.deviceRoles = this.deviceprivilages[0].rights[0];

      this.userprivilages = this.serchPrivilage('user');
      this.userRoles = this.userprivilages[0].rights[0];

      this.entityprivilages = this.serchPrivilage('entities');
      this.entityRoles = this.entityprivilages[0].rights[0];

      this.deviceConfigprivilages = this.serchPrivilage('deviceConfig');
      this.deviceConfigRoles = this.deviceConfigprivilages[0].rights[0];

      if (this.businessRoles.business_unit_list_view) {
        this.businessIcon = true;
      }
      if (this.appRoles.application_list_view) {
        this.appIcon = true;
      }

      if (this.deviceRoles.device_list_view) {
        this.deviceIcon = true;
      }
      if (this.userRoles.user_list_view) {
        this.userIcon = true;
      }
      if (this.entityRoles.entities_list_view) {
        this.entityIcon = true;
      }
      if (this.deviceConfigRoles.deviceConfig_list_view) {
        this.deviceConfigIcon = true;
      }

      if (this.appuserRole == 'Platform Admin') {
        this.rbacIcon = true;
        this.deviceConfigIcon = true;
        this.buEntityIcon = true;
      }
      if (this.appuserRole == 'Application Admin') {
        this.deviceConfigIcon = true;

      }
    }
  }
  serchPrivilage(searchName) {
    if (this.privilages) {
      return this.privilages[0].filter(obj => {
        return obj.role == searchName;
      });
    }
  }

  ngAfterViewInit() {
    jQuery(this.elementRef.nativeElement)
      .find('[data-toggle="tooltip"]')
      .tooltip();
  }
  menuOpen() {
    this.toggleMenu ? (this.toggleMenu = false) : (this.toggleMenu = true);
  }
  clickOutside() {
    if (this.toggleMenu == true) {
      this.toggleMenu = false;
    }
  }
  clickMenu() {
    this.toggleMenu = false;
  }
}
