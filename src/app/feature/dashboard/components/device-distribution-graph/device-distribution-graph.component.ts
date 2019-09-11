import {
  Component,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  Output,
  Input
} from '@angular/core';
import { DashboardConstants } from '../../constants/dashboard.constants';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { bisectRight } from 'd3';

declare let d3: any;
@Component({
  selector: 'dpdhl-device-distribution-graph',
  templateUrl: './device-distribution-graph.component.html',
  styleUrls: [
    './device-distribution-graph.component.scss',
    '../../../../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DeviceDistributionGraphComponent implements OnInit {
  data: any;
  options: any;
  graphUserData: FormGroup;
  @Input() deviceDestributionGraphDataList: any;
  @Input() totalDevice: any;
  @Output() getDateEventDevice: EventEmitter<any> = new EventEmitter<any>();
  minDate: any;
  maxDate = new Date();
  enableToDate: boolean = true;
  defaultEndDate = new Date();
  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    var defaultStartDate = new Date(this.yesterdayDate());
    this.graphUserData = this._fb.group({
      fromDate: [defaultStartDate, [Validators.required]],
      toDate: [this.defaultEndDate]
    });
    this.getDeviceGraphData();
    this.minDate = defaultStartDate;
  }
  ngOnChanges() {
    this.getDeviceGraphData();
  }
  getDeviceGraphData() {
    this.options = {
      chart: {
        type: 'pieChart',
        height: 250,
        x: function(d) {
          return d.x;
        },
        y: function(d) {
          return d.y;
        },
        showLabels: true,
        duration: 500,
        labelType: 'value',
        tooltip: {
          contentGenerator: function(d) {
            return '<p>' + d.data.z + '</p>';
          }
        },
        labelThreshold: 0.01,
        valueFormat: d3.format('.0f'),
        legendPosition: 'right',
        legend: {
          verticalOffset: 25,
          margin: {
            top: 10,
            right: 0,
            bottom: 0,
            left: 10
          }
        }
      }
    };
    if (
      this.deviceDestributionGraphDataList &&
      this.deviceDestributionGraphDataList != 0
    ) {
      this.data = this.deviceDestributionGraphDataList;
    }
  }
  fromDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.graphUserData.patchValue({
      fromDate: this.formatDate(event.value)
    });
    this.minDate = this.formatDate(event.value);
    this.enableToDate = false;
    this.getDeviceDestribution();
  }
  toDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.graphUserData.patchValue({
      toDate: this.formatDate(event.value)
    });
    this.getDeviceDestribution();
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  yesterdayDate() {
    var date = new Date();
    return date.setDate(date.getDate() - 30);
  }
  getDeviceDestribution() {
    this.getDateEventDevice.emit(this.graphUserData.getRawValue());
  }
}
