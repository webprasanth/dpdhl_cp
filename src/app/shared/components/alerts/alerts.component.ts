import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedContants } from '../../constants/shared.constants';

@Component({
  selector: 'dpdhl-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  @Input() alertConfig: any;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    setTimeout(() => {
      this.alertConfig.visibility = false;
    }, 8000);
  }
}
