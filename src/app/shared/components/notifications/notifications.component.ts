import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { AdalService } from 'adal-angular4';
@Component({
  selector: 'dpdhl-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public show: boolean = false;
  public notificationLabel = false;
  public favoriteLabel = false;
  @Input() APPList: any;
  @Input() notification: any;
  @Input() NotificationList: any;
  @Input() Applist: any;

  notificationClicked: string;
  notificationArrayitem = [];
  favoriteAppArray = [
    {
      icon: 'fa-cloud',
      title: 'Application 1',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incidie magna al'
    },
    {
      icon: 'fa-database',
      title: 'Application 2',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incidie magna al'
    },
    {
      icon: 'fa-laptop',
      title: 'Application 3',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incidie magna al'
    }
  ];
  notificationArray = [
    {
      icon: 'fa-exclamation-triangle',
      title: 'Nurman Tri Gumler',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incidie magna al'
    },
    {
      icon: 'fa-exclamation-triangle',
      title: 'Nurman Tri Gumler',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incidie magna al'
    },
    {
      icon: 'fa-exclamation-triangle',
      title: 'Nurman Tri Gumler',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incidie magna al'
    }
  ];

  constructor(
    private _sharedService: SharedService,
    private _adalService: AdalService
  ) { }
  ngOnInit() { }

  toggle(popupId) {
    if (!this.show) {
      this.show = !this.show;
      this.notificationClicked = popupId;
    } else if (this.show && this.notificationClicked == popupId) {
      this.show = !this.show;
    } else if (this.show && this.notificationClicked != popupId) {
      this.notificationClicked = popupId;
    }
    if (popupId == 'dpdhl_notification') {
      this.notificationArrayitem = this.notification;
      this.notificationLabel = true;
      this.favoriteLabel = false;
    }
    if (popupId == 'dpdhl_favoriteApp') {
      console.log('Applist...', this.Applist);
      this.notificationArrayitem = this.Applist;
      this.favoriteLabel = true;
      this.notificationLabel = false;
    }
  }
  clickOutside() {
    if (this.show == true) {
      this.show = !this.show;
    }
  }
  closePopup() {
    this.show = false;
  }
}
