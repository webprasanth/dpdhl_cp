import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Inject,
  Output,
  EventEmitter
} from '@angular/core';
declare var jQuery: any;
import { AdalService } from 'adal-angular4';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'dpdhl-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss']
})
export class NewApplicationComponent implements OnInit {
  @Input() userToken: string;
  @Input() APPData: any;
  @Input() UserName: any;

  @Output() onFavoritSelect: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent: ElementRef<any>;
  leftArrowValue: number;
  rightArrowValue: number = 0;
  leftArrow: boolean = true;
  rightArrow: boolean = false;
  appuserRole;
  appOwnerList;
  constructor(
    private _adalService: AdalService,
    private elementRef: ElementRef,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  ngOnInit() {
    this.appuserRole = this.storage.get('UserRole');

    if (this.appuserRole == 'Platform Admin') {
      this.appOwnerList = true;
    }
  }

  ngAfterViewInit() {
    jQuery(this.elementRef.nativeElement)
      .find('[data-toggle="tooltip"]')
      .tooltip();
  }

  public myFavoriteApp = {
    DSC: false,
    CSI: false,
    GBS: false,
    PNP: false
  };
  public appDescription = {
    DSC: false,
    CSI: false,
    GBS: false,
    PNP: false
  };

  description(event) {
    let desAppId = event.target.id;

    if (desAppId == 'Dsc_WMS_App') {
      this.appDescription.DSC = !this.appDescription.DSC;
    }
    if (desAppId == 'Csi_Track_Trace_App') {
      this.appDescription.CSI = !this.appDescription.CSI;
    }
    if (desAppId == 'Gbs_SE_Report_App') {
      this.appDescription.GBS = !this.appDescription.GBS;
    }
    if (desAppId == 'Pnp_CM_Sat_App') {
      this.appDescription.PNP = !this.appDescription.PNP;
    }
  }

  toggle(event) {
    let appId = event.target.id;
    if (appId == 'Dsc_WMS') {
      this.myFavoriteApp.DSC = !this.myFavoriteApp.DSC;
    }
    if (appId == 'Csi_Track_Trace') {
      this.myFavoriteApp.CSI = !this.myFavoriteApp.CSI;
    }
    if (appId == 'Gbs_SE_Report') {
      this.myFavoriteApp.GBS = !this.myFavoriteApp.GBS;
    }
    if (appId == 'Pnp_CM_Sat') {
      this.myFavoriteApp.PNP = !this.myFavoriteApp.PNP;
    }
  }
  public scrollRight(): void {
    this.rightArrow =
      this.rightArrowValue == this.widgetsContent.nativeElement.scrollLeft + 150
        ? true
        : false;
    this.rightArrowValue = this.widgetsContent.nativeElement.scrollLeft + 150;
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 150,
      behavior: 'smooth'
    });
    this.leftArrow = false;
  }

  public scrollLeft(): void {
    this.leftArrow =
      this.leftArrowValue == this.widgetsContent.nativeElement.scrollLeft - 150
        ? true
        : false;
    this.leftArrowValue = this.widgetsContent.nativeElement.scrollLeft - 150;
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 150,
      behavior: 'smooth'
    });
    this.rightArrow = false;
  }

  onFavorit(event) {
    this.onFavoritSelect.emit(event);
  }
}
