import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { DashboardConstants } from '../../constants/dashboard.constants';
import {
  FormControl,
  AbstractControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DashboardService } from '../../service/dashboard.service';
import * as moment from 'moment';
declare let d3: any;
@Component({
  selector: 'dpdhl-user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: [
    './user-graph.component.scss',
    '../../../../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class UserGraphComponent implements OnInit {
  @Input() userDestributionGraphDataList: any;
  @Output() getDateEvent: EventEmitter<any> = new EventEmitter<any>();

  data: any;
  options: any;
  graphUserData: FormGroup;
  maxDate = new Date();
  defaultEndDate = new Date();
  enableToDate: boolean = true;
  minDate: any;
  tempGraphData: Array<any> = [
    {
      values: []
    }
  ];
  appValue: Array<any> = [];
  tickValue: Array<any> = [];

  isDisabled: boolean = true;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    var defaultStartDate = new Date(this.yesterdayDate());
    this.graphUserData = this._fb.group({
      fromDate: [defaultStartDate, [Validators.required]],
      toDate: [this.defaultEndDate]
    });
    this.userDistribustionGraphData();
    this.minDate = defaultStartDate;
  }
  ngOnChanges() {
    this.userDistribustionGraphData();
  }
  userDistribustionGraphData() {
    if (
      this.userDestributionGraphDataList &&
      this.userDestributionGraphDataList.length > 0
    ) {
      this.tempGraphData[0].values = this.userDestributionGraphDataList;
      for (var i = 0; i < this.tempGraphData[0].values.length; i++) {
        this.appValue.push(this.tempGraphData[0].values[i].x);
        this.tickValue.push(i);
        this.tempGraphData[0].values[i].x = i;
      }

      var appValues = this.appValue;
      this.data = this.tempGraphData;
      var colors = ['#d7d7d7', '#e6e6e6'];
      this.data.map(function (series, i) {
        series.color = colors[i];
        series.colorNotSelected = '#d7d7d7';
        return series;
      });
      this.options = {
        wrapLabels: true,
        chart: {
          type: 'multiBarChart',
          height: 250,
          margin: {
            top: 20,
            right: 20,
            bottom: 45,
            left: 45
          },
          groupSpacing: 0.85,
          showLegend: false,
          reduceXTicks: false,
          rotateLabels: 0,
          xAxis: {
            axisLabel: 'Applications',
            axisLabelDistance: 5,
            showMaxMin: false,
            tick: {
              thickness: 2,
              bandSize: 2
            },
            staggerLabels: true,
            tickValues: this.tickValue,
            tickFormat: function (d) {
              return appValues[d];
            }
          },
          yAxis: {
            axisLabel: 'Users Count',
            axisLabelDistance: -20,
            tickFormat: function (d) {
              return d3.format(',f')(d);
            }
          }
        }
      };
    }
  }
  fromDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.graphUserData.patchValue({
      fromDate: this.formatDate(event.value)
    });
    this.minDate = this.formatDate(event.value);
    this.enableToDate = false;
    this.userDestributionGraphData();
  }
  toDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.graphUserData.patchValue({
      toDate: this.formatDate(event.value)
    });
    this.userDestributionGraphData();
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
  userDestributionGraphData() {
    this.getDateEvent.emit(this.graphUserData.getRawValue());
  }
}
