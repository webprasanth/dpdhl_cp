import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dpdhl-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit {
  @Input() quickLinksCount: any;
  constructor() {}

  ngOnInit() {}
}
