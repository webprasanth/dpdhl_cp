import { Component, OnInit, Inject } from '@angular/core';
import { IApplicationForm } from '../../models/application.models';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { FilterPipe } from '../../../../shared/pipe/filter-pipe';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'dpdhl-favorite-application',
  templateUrl: './favorite-application.component.html',
  styleUrls: ['./favorite-application.component.scss']
})
export class FavoriteApplicationComponent implements OnInit {
  userName;
  userId;
  searchText: string;
  searchAllText: string;
  toggleView: boolean = true;
  allApplication;
  appSort;
  sortby;
  BUList;
  order;
  constructor(
    private _adalService: AdalService,
    private _route: ActivatedRoute,
    private _applicationService: ApplicationService,
    private _router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
    this.appSort = [{
      "option": "A-Z"
    },
    {
      "option": "Z-A"
    }
    ];
    this._route.data.subscribe(data => {
      if (data) {
        this.userName = data.resolveAllApplication.result[0].firstname;
        this.userId = data.resolveAllApplication.result[0].id;

      }

    });
    this.getApplications();
    this._route.data.subscribe(data => {
      if (data) {
        this.BUList = data.resolveBusinessUnit.result;

      }
    });

  }
  getApplications() {
    let params = {
      'userRole': this.storage.get('UserRole'),
      'userEmailID': this._adalService.userInfo.userName
    }
    this._applicationService.getApplication(params).subscribe(res => {
      if (res) {
        this.allApplication = res.result;
      }
    });
  }

  onFavoritSelect(appDetails) {
    if (appDetails.isfavorite) {
      appDetails.isfavorite = false;
    } else {
      appDetails.isfavorite = true;
    }

    let params = {
      userID: this.userId,
      appID: appDetails.id,
      isFavorite: appDetails.isfavorite
    };

    this._applicationService.updateFavoriteApp(params).subscribe(res => {
      if (res) {
        console.log(res);
        this.getApplications();

      }
    });
  }

  onSearchAllText(value) {
    if (value.length > 1) {
      this.searchAllText = value;
    }
    else {
      this.searchText = '';
    }
  }

  onSort(value) {
    this.sortby = value;
    if (value == 'A-Z') {
      this.order = 'asc';
    } else {
      this.order = 'desc';
    }
  }

  onBUSelection(event) {
    this.searchAllText = event;
  }

}
