import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dpdhl-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @Output() closeView: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() viewData: any;
  @Input() userGroup: any;
  constructor() { }

  ngOnInit() {
    console.log('view data...', this.viewData);
  }
  getCamelCase(key) {
    var frags = key.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }
  closePopup() {
    this.closeView.emit(false);
  }

}
