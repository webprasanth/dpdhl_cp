import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Inject
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Router, NavigationEnd } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() entityList: any;
  @Input() childEntityList: any;
  @Input() selectedEntity: any;
  @Input() treeViewRoot: any;
  @Input() entityFlow: string;

  @Output() getChildEntityList: EventEmitter<any> = new EventEmitter<any>();
  @Output() entityFormData: EventEmitter<any> = new EventEmitter<any>();

  entityForm: FormGroup;
  fileInput: any;
  association: boolean = false;
  parentEntity: any = [];
  childEntity: any = [];
  items: FormArray;
  parentHolder: any;
  childHolder: any;
  entityExist: boolean = false;
  entityValidation: boolean = true;
  showEntityType: boolean = true;
  oldParentInfo: any = {
    oldParentID: null,
    oldParentType: ''
  };
  editChecked: boolean = false;
  selectedNode: any;
  routerUrl: string;

  //Grid of uploaded list
  displayedColumns: string[] = ['select'];
  dataColumnOptions = [
    {
      title: 'Row Selection',
      property: 'select',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];
  configuration: any = {
    rowList: [10, 20, 50],
    action: false,
    primaryKey: '',
    dataColumnOptions: this.dataColumnOptions,
    actionOptions: {
      edit: true,
      delete: true,
      setting: true
    },
    exportExcel: true,
    exportExcelName: 'MetaData.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };

  //Grid of uploaded list
  displayedColumnsEdit: string[] = ['select'];
  dataColumnOptionsEdit = [
    {
      title: 'Row Selection',
      property: 'select',
      width: 70,
      visible: true,
      isNumber: false,
      isDate: false
    }
  ];
  configurationEdit: any = {
    rowList: [10, 20, 50],
    action: false,
    primaryKey: '',
    dataColumnOptions: this.dataColumnOptionsEdit,
    actionOptions: {
      edit: true,
      delete: true,
      setting: true
    },
    exportExcel: true,
    exportExcelName: 'MetaData.xlsx',
    exportExcelOptions: {
      all: true,
      current: true,
      selected: true
    }
  };
  exportedData: any = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {
    this._router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url == '/entity/add') {
          this.routerUrl = 'add';
        } else {
          this.routerUrl = 'edit';
        }
      }
    });
  }

  ngOnInit() {
    if (this.selectedEntity) {
      if (this.storage.get('parentEntity')) {
        this.selectedNode = this.storage.get('parentEntity');
      } else {
        this.selectedNode = {
          id: null,
          name: '',
          type: '',
          parent_id: null,
          parent_name: '',
          parent_type: ''
        };
      }

      this.gridView(this.selectedEntity.entityMetadata);
      this.entityForm = this._fb.group({
        entityID: [this.selectedEntity.entityID],
        entityName: [
          {
            value: this.selectedEntity.entityName,
            disabled: this.selectedEntity.entityID == null ? false : true
          },
          [Validators.required]
        ],
        entityType: [this.selectedEntity.entityType],
        isShareable: [this.selectedEntity.isShareable],
        parentID: [
          this.selectedEntity.parentID
            ? this.selectedEntity.parentID
            : this.entityFlow == 'add'
            ? this.selectedNode.id
            : this.selectedNode.parent_id
        ],
        parentName: [
          {
            value: this.selectedEntity.parentName
              ? this.selectedEntity.parentName
              : this.entityFlow == 'add'
              ? this.selectedNode.name
              : this.selectedNode.parent_name,
            disabled: true
          }
        ],
        parentType: [
          this.selectedEntity.parentType
            ? this.selectedEntity.parentType
            : this.routerUrl == 'add'
            ? this.selectedNode.type
            : this.selectedNode.parent_type
        ],
        grandParentName: [this.selectedEntity.grandParentName],
        grandParentType: [this.selectedEntity.grandParentType],
        grandParentID: [this.selectedEntity.grandParentID],
        createdBy: [this.selectedEntity.createdBy],
        isParentIsEntity: [this.selectedEntity.isParentIsEntity],
        entityMetadata: [this.selectedEntity.entityMetadata],
        newEntityMetadata: [''],
        removedEntityMetadata: [''],
        modifiedBy: [this.selectedEntity.modifiedBy]
      });
      // if(this.selectedEntity && this.selectedEntity.entityID){
      //   this.editChecked =
      // }
      if (
        this.selectedEntity &&
        this.selectedEntity.entityID != null &&
        this.selectedEntity.entityID > 0
      ) {
        this.entityValidation = false;
        this.oldParentInfo = {
          oldParentID: this.selectedEntity.parentID,
          oldParentType: this.selectedEntity.parentType
        };
      }
      if (this.selectedEntity.grandParentID) {
        let editParentIndex = this.entityList.findIndex(val => {
          return val.id == this.selectedEntity.grandParentID;
        });
        this.parentHolder = this.entityList[editParentIndex];
        this.association = true;
      }
      if (
        this.selectedEntity.grandParentID == null &&
        this.selectedEntity.parentID
      ) {
        let editParentIndex = this.entityList.findIndex(val => {
          return val.id == this.selectedEntity.parentID;
        });
        this.parentHolder = this.entityList[editParentIndex];
        this.association = true;
      }
      let selectedEntityIndex = this.entityList.findIndex(val => {
        return val.id == this.selectedEntity.entityID;
      });
      if (selectedEntityIndex > -1) {
        this.entityList.splice(selectedEntityIndex, 1);
      }
    }
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
      this.exportedData = exportData.data;
      if (this.entityFlow == 'edit') {
        this.gridViewEdit(this.exportedData);
      } else {
        this.gridView(this.exportedData);
      }
    };
    reader.readAsBinaryString(file);
  }

  selectedDataGrid(event) {
    this.entityForm.patchValue({
      entityMetadata: event
    });
    console.log(this.entityForm.getRawValue());
  }

  deSelectedDataGrid(event) {
    this.entityForm.patchValue({
      removedEntityMetadata: event
    });
    console.log(this.entityForm.getRawValue());
  }

  newSelectedDataGrid(event) {
    this.entityForm.patchValue({
      newEntityMetadata: event
    });
    console.log(this.entityForm.getRawValue());
  }

  gridView(data) {
    var myObject = data[0];
    var size = 0,
      key;
    for (key in myObject) {
      if (myObject.hasOwnProperty(key)) size++;
      this.displayedColumns.push(key);
      let obj = {
        title: key,
        property: key,
        width: 150,
        visible: true,
        isNumber: false,
        isDate: false
      };
      this.dataColumnOptions.push(obj);
    }
  }

  gridViewEdit(data) {
    var myObject = data[0];
    var size = 0,
      key;
    for (key in myObject) {
      if (myObject.hasOwnProperty(key)) size++;
      this.displayedColumnsEdit.push(key);
      let obj = {
        title: key,
        property: key,
        width: 150,
        visible: true,
        isNumber: false,
        isDate: false
      };
      this.dataColumnOptionsEdit.push(obj);
    }
  }

  getEntityTypes(type) {
    if (type == 'others') {
      this.showEntityType = true;
    } else if (type == 'application') {
      this._router.navigate(['/application/add']);
    } else if (type == 'users') {
      this._router.navigate(['/users/onboard/0/0']);
    } else if (type == 'devices') {
      this._router.navigate(['/devices/onboard']);
    }
  }

  selectGrantParentEntity(data) {
    if (data.value) {
      let index = this.entityList.findIndex(val => {
        return val.id == data.value;
      });
      this.parentHolder = this.entityList[index];
      this.entityForm.patchValue({
        parentID: this.parentHolder.id,
        parentName: this.parentHolder.entity_name,
        parentType: this.parentHolder.entity_type,
        isParentIsEntity: false
      });
      this.getChildEntityList.emit(this.entityList[index]);
    } else {
      this.entityForm.patchValue({
        grandParentID: null,
        grandParentName: '',
        grandParentType: '',
        parentID: null,
        parentName: '',
        parentType: '',
        isParentIsEntity: true
      });
    }
  }

  selectParentEntity(data) {
    if (data.value) {
      let index = this.childEntityList.findIndex(val => {
        return val.id == data.value;
      });
      this.childHolder = this.childEntityList[index];
      this.entityForm.patchValue({
        grandParentID: this.parentHolder.id,
        grandParentName: this.parentHolder.entity_name,
        grandParentType: this.parentHolder.entity_type,
        parentID: this.childHolder.id,
        parentName: this.childHolder.entity_object.Name,
        parentType: this.parentHolder.entity_type,
        isParentIsEntity: false
      });
    } else {
      this.entityForm.patchValue({
        grandParentID: null,
        grandParentName: '',
        grandParentType: '',
        parentID: this.parentHolder.id,
        parentName: this.parentHolder.entity_name,
        parentType: this.parentHolder.entity_type,
        isParentIsEntity: false
      });
    }
  }

  searchEntity() {
    let index = this.entityList.findIndex(val => {
      return (
        val.entity_name.toLowerCase() ==
        this.entityForm.controls['entityName'].value.toLowerCase()
      );
    });
    if (index > -1) {
      this.entityExist = true;
      this.entityValidation = true;
    } else {
      this.entityExist = false;
      this.entityValidation = false;
    }
  }

  onSubmit() {
    // if (
    //   this.selectedEntity &&
    //   this.selectedEntity.entityID != null &&
    //   this.selectedEntity.entityID > 0
    // ) {
    //   this.entityForm.addControl(
    //     'oldParentID',
    //     this._fb.control(this.oldParentInfo.oldParentID)
    //   );
    //   this.entityForm.addControl(
    //     'oldParentType',
    //     this._fb.control(this.oldParentInfo.oldParentType)
    //   );
    // }
    this.entityForm.patchValue({
      entityType: this.entityForm.controls['entityName'].value
    });
    this.entityFormData.emit(this.entityForm.getRawValue());
    // console.log(this.entityForm.getRawValue());
  }
}
