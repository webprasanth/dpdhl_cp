import { Component, OnInit } from '@angular/core';
import { DashboardConstants } from '../../constants/dashboard.constants';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dpdhl-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: [
    './device-status.component.scss',
    '../../../../../../node_modules/nvd3/build/nv.d3.css'
  ]
})
export class DeviceStatusComponent implements OnInit {
  data: any;
  options: any;
  graphUserData: any;
  maxDate = new Date();
  picker: any;
  constructor(private _fb: FormBuilder) { }
  ngOnInit() {
    this.graphUserData = this._fb.group({
      fromDate: [this.maxDate, [Validators.required]]
    });
    this.options = {
      chart: {
        type: 'multiBarChart',
        height: 250,
        margin: {
          top: 20,
          right: 20,
          bottom: 45,
          left: 45
        },
        groupSpacing: 0.75,
        showLegend: false,
        stacked: true,
        xAxis: {
          axisLabel: 'Application',
          showMaxMin: false,
          tick: {
            thickness: 2,
            bandSize: 2
          },
          tickValues: [],
          tickFormat: function (d) {
            return appValues[d];
          }
        },
        yAxis: {
          axisLabel: 'Device Status',
          axisLabelDistance: -20,
          tickFormat: function (d) {
            return d3.format(',f')(d);
          }
        }
      }
    };
    var appValues = [];
    // this.data = DashboardConstants.nvd3TestData1;
    var colors = ['#d7d7d7', '#e6e6e6'];
    this.data.map(function (series, i) {
      series.color = colors[i];
      series.colorNotSelected = '#d7d7d7';
      return series;
    });
    // function appValues1(d) {
    //   console.log("d >>>", d)
    //   var appValues = ['Customer Satisfaction', 'Track & Trace', 'Smart Energy', 'Warehouse Monitoring', 'Sorting System Predictive'];
    //   var app;
    //   for (var i = 0; i < appValues.length; i++) {
    //     this.app = appValues[i]
    //   }
    //   return app
    // }
  }
}
