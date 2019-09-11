import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  Inject
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssociationsService } from '../../services/associations.service';
import { JsonPipe } from '@angular/common';
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';
import {
  TreeNode,
  ITreeOptions,
  TreeComponent,
  TREE_ACTIONS,
  TreeModel,
  KEYS
} from 'angular-tree-component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AssociationsConstants } from '../../constants/associations-constants';
import { TreeviewConfig } from 'ngx-treeview';
import { AdalService } from 'adal-angular4';

// import { request } from 'http';

@Component({
  selector: 'dpdhl-associations-view',
  templateUrl: './associations-view.component.html',
  styleUrls: ['./associations-view.component.scss']
})
export class AssociationsViewComponent implements OnInit {
  @ViewChild('treeContainer', {
    read: ElementRef
  })
  private treeContainer: ElementRef;

  @ViewChild('widgetsContent', { read: ElementRef })
  // @ViewChild('tree')
  // treeComponent: TreeComponent;
  public widgetsContent: ElementRef<any>;
  leftArrowValue: number;
  rightArrowValue: number = 0;
  leftArrow: boolean = true;
  rightArrow: boolean = false;
  selectedParent: any;
  associationList: any;
  selectedNode: any;
  userGroupListPopup: boolean = false;
  userGroupList: any;
  deviceGroupListPopup: boolean = false;
  deviceGroupList: any;
  applicationListPopup: boolean = false;
  applicationList: any;

  showPop: boolean = false;
  isOpen: boolean = false;
  defaultClass: boolean = true;
  grandChildNodeClicked: boolean = false;
  items: any;
  child: any;

  treeTop: number;
  treeLeft: number;
  treeWidth: number;

  toggleView: boolean = false;

  options: ITreeOptions = {
    useVirtualScroll: false,
    nodeHeight: 60
  };

  expandView: boolean = false;

  // @ViewChild(TreeComponent) public tree: TreeComponent;
  @ViewChild('tree') tree: any;

  userGroupForm: FormGroup;
  deviceGroupForm: FormGroup;
  applicationForm: FormGroup;

  showEventPopup: boolean = false;

  devicesNotAssociated: any;
  filterText: string;

  usersListPopup: boolean = false;
  userListData: any;
  userListGroupName: any;
  displayedColumnsUserList: string[] = [
    'first_name',
    'email_id',
    'created_by',
    'last_login'
  ];
  userId: any;
  userRole: any;

  configurationUserList: any = {
    rowList: [10, 20, 50],
    action: false,
    primaryKey: 'user_group_name',
    dataColumnOptions: AssociationsConstants.dataColumnOptionsUserList,
    actionOptions: {
      edit: true,
      delete: false,
      view: false
    },
    exportExcel: true,
    exportExcelName: 'UsersGroupList.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };

  deviceList: any;
  deviceListGroupName: any;
  deviceListPopup: boolean = false;
  displayedColumnsDeviceGroup: string[] = [];
  displayedColumnsTemp: string[] = [];
  dataColumnOptionsDeviceGroup = [];
  configurationDeviceGroup: any = {
    rowList: [10, 20, 50],
    action: false,
    primaryKey: 'device_type_name',
    dataColumnOptions: this.dataColumnOptionsDeviceGroup,
    actionOptions: {
      edit: true,
      delete: true,
      setting: true
    },
    refresh: false,
    exportExcel: true,
    exportExcelName: 'DeviceMetaData.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private renderer: Renderer2,
    private _router: Router,
    private _associationsService: AssociationsService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _fb: FormBuilder,
    private _notificationService: NotificationsService,
    private _adalService: AdalService
  ) {
    this.userId = this.storage.get('userId');
    this.userRole = this.storage.get('UserRole');
  }
  ngOnInit() {
    this.storage.remove('parentEntity');
    this.storage.remove('appID');
    this.storage.remove('buID');

    if (this.storage.get('AssociationEntity')) {
      this.getAssociationAPI(this.storage.get('AssociationEntity'));
      this.storage.remove('AssociationEntity');
    }

    this._route.data.subscribe(data => {
      this.items = data.resolveAssociationsList.result;
    });
    this.userGroupForm = this._fb.group({
      userGroupID: [''],
      userGroupName: [''],
      parentID: [''],
      parentName: [''],
      parentType: ['']
    });
    this.deviceGroupForm = this._fb.group({
      deviceGroupID: [''],
      deviceGroupName: [''],
      appID: [null],
      buID: [null],
      parentID: [''],
      parentName: [''],
      parentType: ['']
    });
    this.applicationForm = this._fb.group({
      appID: [''],
      appName: [''],
      parentID: [''],
      parentName: [''],
      parentType: ['']
    });
  }

  searchList(value) {
    if (value.length >= 3) {
      this.filterText = value;
    } else {
      this.filterText = '';
    }
  }

  getTopLevelEntities() {
    let param = {
      userEmailID: this._adalService.userInfo.userName,
      userID: this.storage.get('userId'),
      userRole: this.storage.get('UserRole')
    };
    this._associationsService.getTopLevelEntities(param).subscribe(res => {
      if (res) {
        this.items = res.result;
      }
    });
  }

  getChildren(data) {}

  getAssociationAPI(app) {
    this.selectedParent = app;
    let param = {
      entityID: app.entity_id,
      entityName: app.entity_name,
      entityType: app.entity_type
    };
    this.getAssociationList(param);
    this.storage.set('AssociationEntity', app);
    this.expandView = false;
  }

  public scrollRight(): void {
    this.rightArrow =
      this.rightArrowValue == this.widgetsContent.nativeElement.scrollLeft + 250
        ? true
        : false;
    this.rightArrowValue = this.widgetsContent.nativeElement.scrollLeft + 250;
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 250,
      behavior: 'smooth'
    });
    this.leftArrow = false;
  }

  public scrollLeft(): void {
    this.leftArrow =
      this.leftArrowValue == this.widgetsContent.nativeElement.scrollLeft - 250
        ? true
        : false;
    this.leftArrowValue = this.widgetsContent.nativeElement.scrollLeft - 250;
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 250,
      behavior: 'smooth'
    });
    this.rightArrow = false;
  }

  getEntityDetails(id) {
    this._associationsService.getAssociationEntity(id).subscribe(res => {
      if (res) {
        console.log('res = ', res);
      }
    });
  }
  getPosition(event) {
    this.treeLeft = event.pageX - 100;
    this.treeTop = event.pageY - 30;
    this.treeWidth = event.target.offsetWidth + event.target.offsetWidth.auto;
    if (
      event.path[0].nodeName == 'SPAN' &&
      event.path[0].innerHTML !== '<span class="toggle-children"></span>'
    ) {
      this.showEventPopup = true;
    } else {
      this.showEventPopup = false;
    }
  }
  onEvent(event) {
    this.selectedNode = event.node.data;
    if (event && (event.isExpanded || !event.isExpanded)) {
      this.showEventPopup = false;
    }
    if (event && event.isExpanded == undefined) {
      this.showEventPopup = true;
    }
    if (event.node.data.type == 'Business Unit') {
      this.storage.set('buID', event.node.data.id);
    }
    if (event.node.data.type == 'Application') {
      this.storage.set('appID', event.node.data.id);
    }
    if (event.eventName == 'focus') {
      // if (event.node.data.type == 'User Group') {
      // console.log(event.node.data);
      // this._associationsService
      //   .getAllUsersByGroupId(event.node.data.id)
      //   .subscribe(res => {
      //     console.log(res);
      //   });
      // this.usersListPopup = true;
      // }
      // if (event.node.data.type == 'Device Group') {
      //   console.log(event.node.data);
      // this.deviceGroupListPopup = true;
      // }
    }
  }

  getUsersByGroup(data) {
    this._associationsService.getAllUsersByGroupId(data.id).subscribe(res => {
      if (res && res.result && res.result.length > 0) {
        this.userListData = res.result[0].users;
        this.userListGroupName = res.result[0].user_group_name;
        this.usersListPopup = true;
      }
    });
  }

  getDevicesByGroup(data) {
    this._associationsService.getAllDevicesByGroupId(data.id).subscribe(res => {
      if (res && res.result && res.result.length > 0) {
        this.deviceList = res.result[0].devicemetadata;
        this.deviceListGroupName = res.result[0].device_group_name;
        this.deviceListPopup = true;
        var myObject = this.deviceList[0];
        var size = 0,
          key;
        for (key in myObject) {
          if (myObject.hasOwnProperty(key)) size++;
          var frags = key.split('_');
          for (let i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
          }
          this.displayedColumnsDeviceGroup.push(key);
          let obj = {
            title: frags.join(' '),
            property: key,
            width: 150,
            visible: true,
            isNumber: false,
            isDate: false
          };
          this.dataColumnOptionsDeviceGroup.push(obj);
          this.configurationDeviceGroup.dataColumnOptions = this.dataColumnOptionsDeviceGroup;
        }
      }
    });
  }

  deviceListPopupClose() {
    this.displayedColumnsDeviceGroup = [];
    this.dataColumnOptionsDeviceGroup = [];
  }

  getAssociationList(data) {
    this._associationsService.getAllAssociationByBU(data).subscribe(res => {
      this.associationList = res.result;
      if (this.associationList && this.associationList.length > 0) {
        setTimeout(() => {
          this.expandAllTree();
        }, 100);
        this.tree.treeModel.update();
        this.tree.treeModel.expandAll();
      }
    });
  }

  expandAllTree() {
    this.tree.treeModel.expandAll();
    this.expandView = !this.expandView;
  }
  collapseAllTree() {
    this.tree.treeModel.collapseAll();
    this.expandView = !this.expandView;
  }

  newEntity(node) {
    this.storage.set('parentEntity', node);
    this._router.navigate(['/entity/add/']);
  }
  editEntity(node) {
    this.storage.set('parentEntity', node);
    this._router.navigate(['/entity/edit/', node.id]);
  }
  newApplication(node) {
    this.storage.set('parentEntity', node);
    this.applicationListPopup = true;
    this.applicationForm.patchValue({
      parentID: node.id,
      parentName: node.name,
      parentType: node.type
    });
    this._associationsService.getNotAssociatedApplication().subscribe(res => {
      this.applicationList = res.result;
      this.getTopLevelEntities();
    });
  }

  createUserGroup(node) {
    this.userGroupListPopup = true;
    this.storage.set('parentEntity', node);
    // let param = {
    //   entityID: node.id,
    //   entityName: node.name,
    //   entityType: node.type
    // };
    let param = {
      userRole: this.userRole,
      userEmailID: this._adalService.userInfo.userName
    };
    this._associationsService.getAllUserGroups(param).subscribe(res => {
      this.userGroupList = res.result;
    });
    // this._router.navigate(['/users/onboard/', 0]);
  }
  editUserGroup(node) {
    this._router.navigate(['/users/onboard/' + node.entity_id]);
  }
  createDeviceGroup(node) {
    this.storage.set('parentEntity', node);
    this.deviceGroupForm.patchValue({
      parentID: node.id,
      parentName: node.name,
      parentType: node.type
    });
    this.deviceGroupListPopup = true;
    this.getDeviceNotAssociated();
  }
  editBusinessUnit(node) {
    this.storage.set('parentEntity', node);
  }
  editApplication(node) {
    this.storage.set('parentEntity', node);
  }

  selectedUserGroup(event) {
    this.userGroupForm.patchValue({
      userGroupID: event.value.id,
      userGroupName: event.value.user_group_name
    });
  }

  associateUserGroup() {
    this.userGroupForm.patchValue({
      parentID: this.selectedNode.id,
      parentName: this.selectedNode.name,
      parentType: this.selectedNode.type
        ? this.selectedNode.type
        : this.selectedNode.entity_type
    });
    this._associationsService
      .getAssociateGroup(this.userGroupForm.getRawValue())
      .subscribe(res => {
        let param = {
          entityID: this.selectedParent.entity_id,
          entityName: this.selectedParent.entity_name,
          entityType: this.selectedParent.entity_type
        };
        this.getAssociationList(param);
        this.getTopLevelEntities();
        this.userGroupListPopup = false;
        this.userGroupForm.reset();
      });
  }

  getDeviceNotAssociated() {
    let param = {
      userRole: this.userRole,
      userEmailID: this._adalService.userInfo.userName
    };
    this._associationsService
      .getDeviceGroupNotAssociated(param)
      .subscribe(res => {
        this.devicesNotAssociated = res.result;
      });
  }

  selectedDeviceGroup(data) {
    this.deviceGroupForm.patchValue({
      deviceGroupID: data.value.id,
      deviceGroupName: data.value.device_group_name
    });
  }

  associateDeviceGroup() {
    this._associationsService
      .associateDeviceGroup(this.deviceGroupForm.getRawValue())
      .subscribe(res => {
        let param = {
          entityID: this.selectedParent.entity_id,
          entityName: this.selectedParent.entity_name,
          entityType: this.selectedParent.entity_type
        };
        this.getAssociationList(param);
        this.getTopLevelEntities();
        this.deviceGroupListPopup = false;
        this.deviceGroupForm.reset();
      });
  }

  selectedApplication(data) {
    this.applicationForm.patchValue({
      appID: data.value.id,
      appName: data.value.name,
      parentID: this.selectedParent.entity_id,
      parentName: this.selectedParent.entity_name,
      parentType: this.selectedParent.entity_type
    });
  }

  associateApplication() {
    this._associationsService
      .associateApplication(this.applicationForm.getRawValue())
      .subscribe(res => {
        this._notificationService.success(
          'Application Associated Successfully'
        );
        this.storage.remove('parentEntity');
        this.applicationListPopup = !this.applicationListPopup;
        let associate = {
          entityID: this.selectedParent.entity_id,
          entityName: this.selectedParent.entity_name,
          entityType: this.selectedParent.entity_type
        };
        this.getAssociationList(associate);
      });
  }
  deAssociateEntity(node) {
    let param = {
      entityID: node.id,
      entityName: node.name,
      entityType: node.type
    };
    this._associationsService.deAssociateEntity(param).subscribe(res => {
      this._notificationService.success(
        node.name + ' De-associated Successfully'
      );
      let associate = {
        entityID: this.selectedParent.entity_id,
        entityName: this.selectedParent.entity_name,
        entityType: this.selectedParent.entity_type
      };
      this.getAssociationList(associate);
      this.getTopLevelEntities();
    });
  }

  clickOutside(event) {
    this.showEventPopup = false;
  }

  onTreeview(event) {}
}
