import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  PageEvent
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'dpdhl-mat-grid',
  templateUrl: './mat-grid.component.html',
  styleUrls: ['./mat-grid.component.scss']
})
export class MatGridComponent implements OnInit {
  @Input() displayedColumns: any;
  @Input() dataColumnOwner: any;
  @Input() data: Array<any>;
  @Input() configuration: any;
  @Input() popUpConfig: any;

  @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() editEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() emailEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() selectedDataEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshEvent: EventEmitter<any> = new EventEmitter<any>();
  dataSource: any;
  dataSource2: any;
  deleteId: number;
  deleteList: any;
  pageEvent: any;
  popUpVisibility: boolean = false;

  selection = new SelectionModel<any>(true, []);
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('paginatorTop') topPaginator: MatPaginator;
  @ViewChild('paginatorBottom') bottomPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _route: ActivatedRoute) {}

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource2 = new MatTableDataSource<any>(this.data);
    // this.dataSource.paginator = this.paginator;
    this.dataSource.paginator = this.topPaginator;
    this.dataSource2.paginator = this.bottomPaginator;

    this.topPaginator.length = this.dataSource.data.length;
    this.bottomPaginator.length = this.dataSource2.data.length;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
    this.selectedDataEvent.emit(this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.name + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**Delete Bu User */
  delete(id) {
    let primaryKey = this.configuration.primaryKey;
    this.deleteId = id;
    this.popUpVisibility = true;
    let filteredId = this.dataSource.data.filter(function(a) {
      return a.id == id;
    });
    let moreItems = this.selection.selected.length - 1 + ' more items';
    if (this.selection.selected.length > 1) {
      this.deleteList = this.selection.selected;
      this.popUpConfig.rowOne = filteredId[0][primaryKey] + ', +' + moreItems;
    } else {
      this.deleteList = id;
      this.popUpConfig.rowOne = filteredId[0][primaryKey];
      this.selection.clear();
    }
  }

  view(id) {
    this.viewEvent.emit(id);
  }

  headerFunction(str) {
    var frags = str.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  editRow(id) {
    if (this.selection.selected.length > 1) {
      this.editEvent.emit(this.selection.selected);
    } else {
      this.editEvent.emit(id);
    }
  }
  refresh() {
    this.refreshEvent.emit();
  }
  email(element) {
    this.emailEvent.emit(element);
  }

  public exportAsExcelFile(jsonData: any[]): void {
    let dataArray = [];

    var tempDisplayedColumns = this.displayedColumns;
    let selectVal = tempDisplayedColumns.indexOf('select');
    let actionVal = tempDisplayedColumns.indexOf('action');
    if (selectVal > -1) {
      tempDisplayedColumns.shift();
    }
    if (actionVal > -1) {
      tempDisplayedColumns.pop();
    }
    dataArray = jsonData.map(function(obj) {
      return tempDisplayedColumns.reduce(function(newo, name) {
        newo[name] = obj[name];

        return newo;
      }, {});
    });
    let finalArrayValue = [];
    for (let i = 0; i < dataArray.length; i++) {
      finalArrayValue.push(
        Object.keys(dataArray[i]).reduce(
          (c, k) => ((c[this.getCamelCase(k)] = dataArray[i][k]), c),
          {}
        )
      );
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(finalArrayValue);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.configuration.exportExcelName);
  }

  exportAsXLSX(event): void {
    if (event == 'checked') {
      this.exportAsExcelFile(this.selection.selected);
    }
    if (event == 'all') {
      this.exportAsExcelFile(this.dataSource.data);
    }
    if (event == 'current') {
      const startIndex =
        this.topPaginator.pageIndex * this.topPaginator.pageSize;
      const endIndex = startIndex + this.topPaginator.pageSize;
      const itemsShowed = this.dataSource.filteredData.slice(
        startIndex,
        endIndex
      );
      this.exportAsExcelFile(itemsShowed);
    }
  }

  handlePageTop(e: any) {
    let { pageSize } = e;

    this.bottomPaginator.pageSize = pageSize;

    if (!this.topPaginator.hasNextPage()) {
      this.bottomPaginator.lastPage();
    } else if (!this.topPaginator.hasPreviousPage()) {
      this.bottomPaginator.firstPage();
    } else {
      if (this.topPaginator.pageIndex < this.bottomPaginator.pageIndex) {
        this.bottomPaginator.previousPage();
      } else if (this.topPaginator.pageIndex > this.bottomPaginator.pageIndex) {
        this.bottomPaginator.nextPage();
      }
    }
  }

  handlePageBottom(e: any) {
    let { pageSize } = e;

    this.topPaginator.pageSize = pageSize;
    if (!this.bottomPaginator.hasNextPage()) {
      this.topPaginator.lastPage();
    } else if (!this.bottomPaginator.hasPreviousPage()) {
      this.topPaginator.firstPage();
    } else {
      if (this.bottomPaginator.pageIndex < this.topPaginator.pageIndex) {
        this.topPaginator.previousPage();
      } else if (this.bottomPaginator.pageIndex > this.topPaginator.pageIndex) {
        this.topPaginator.nextPage();
      }
    }
    this.topPaginator.length = this.dataSource.data.length;
    this.dataSource.sort = this.sort;
  }

  /*********  Popup event for delete  ***********/
  popUpEvent(event) {
    if (event) {
      this.deleteEvent.emit(this.deleteList);
      this.popUpVisibility = false;
    } else if (!event) {
      this.popUpVisibility = false;
    }
  }

  findSelectedRow(id) {
    return this.selection.selected.findIndex(x => x.id === id);
  }
  isObject(val) {
    return typeof val;
  }

  getCamelCase(key) {
    var frags = key.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }
}
