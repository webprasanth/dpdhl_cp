import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChange,
  Inject
} from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() userName: string;
  @Input() hamburgerMenu: any;
  @Input() alertObservable: any;
  @Input() appuserRole: any;
  @Output() loginEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchText: string;
  public show: boolean = false;
  notificationClicked: string;
  dropdownMenu: boolean = false;
  mainDropDown: boolean = false;
  plus_hot_key: boolean = false;
  showDropdown: boolean = true;
  hamburgerMenuData: any;
  hamburgerMenuArr: [];
  open_drop_down_list: boolean = false;
  alertList: any;
  userRole: any;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
    this.userRole = this.storage.get('UserRole');
  }

  login(event) {
    if (!event) {
      this.storage.remove('privileges');
      this.storage.remove('reload');
    }
    this.loginEvent.emit(event);
  }

  navMenu() {
    this.dropdownMenu = !this.dropdownMenu;
  }

  toggleMainNav() {
    this.mainDropDown = !this.mainDropDown;
  }

  clickOutside() {
    if (this.mainDropDown == true) {
      this.mainDropDown = !this.mainDropDown;
    }
  }
  popupOpen() {
    // this.dropdownMenu = false;
    this.plus_hot_key = !this.plus_hot_key;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (this.alertObservable && this.alertObservable.length > 0) {
      this.alertList = this.alertObservable.map(obj => {
        let rObj = {};
        rObj['name'] = obj.name;
        rObj['state'] = obj.properties.essentials.alertState;
        rObj['date'] =
          obj.properties.essentials.monitorConditionResolvedDateTime;
        rObj['severity'] = obj.properties.essentials.severity;
        return rObj;
      });
    }
    if (
      changes['hamburgerMenu'] &&
      changes['hamburgerMenu'].previousValue !=
        changes['hamburgerMenu'].currentValue
    ) {
      console.log('hamburgerMenu = ', this.hamburgerMenu);
      this.hamburgerMenuData = Object.keys(this.hamburgerMenu).map(
        i => this.hamburgerMenu[i]
      );
      var valuesData = Object.values(this.hamburgerMenu);
      var keysData = Object.keys(this.hamburgerMenu);

      //this.hamburgerMenuArr.push(this.keysData[0]);
      // Object.keys(this.hamburgerMenu).forEach(key => {
      //   //this.hamburgerMenuArr.push(key)
      // });
    }
  }

  openDropDown() {
    this.showDropdown = false;
  }

  toggle(popupId) {
    if (!this.show) {
      this.show = !this.show;
      this.notificationClicked = popupId;
    } else if (this.show && this.notificationClicked == popupId) {
      this.show = !this.show;
    } else if (this.show && this.notificationClicked != popupId) {
      this.notificationClicked = popupId;
    }
  }
  clickOutsideNotify() {
    if (this.show == true) {
      this.show = !this.show;
    }
  }
  closePopup() {
    this.show = false;
  }

  onSearchText(value) {
    if (value.length > 1) {
      this.searchText = value;
    } else {
      this.searchText = '';
    }
  }
}
