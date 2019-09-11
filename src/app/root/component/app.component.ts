import { Component, OnInit, Inject } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { AD_CONFIG } from './../../../environments/environment.prod';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { LoaderService } from './../../core/services/loader.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DOCUMENT } from '@angular/platform-browser';
import { AppInsightService } from '../services/app-insight.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../constants/app-constants';
import { filter } from 'rxjs/operators';
import { AutoLogoutService } from '../services/auto-logout.service'
@Component({
  selector: 'dpdhl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AutoLogoutService]
})
export class AppComponent implements OnInit {
  routerUrl: string;
  routerStartUrl: string;
  userName: string;
  isLoading: BehaviorSubject<boolean>;

  timeLeft: number = 0;
  interval;
  subscribeTimer: any;
  NotificationList;
  Applist;
  previousUrl: string;
  // isLoading: boolean;
  notification: any = AppConstants.NOTIFICATION_DATA;

  hamburgerMenu: any;

  notificationOptions: any = {
    position: ['top', 'center'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    clickIconToClose: false
  };

  alertObservable: any;
  privileges: any;
  appuserRole: any;

  constructor(
    private adalService: AdalService,
    private router: Router,
    private _loaderService: LoaderService,
    private _appService: AppService,
    private _adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    @Inject(DOCUMENT) private doc: any,
    private appInsightService: AppInsightService,
    private autoLogoutService: AutoLogoutService
  ) {
    this.adalService.init(AD_CONFIG);
    if (!this.isLoggedIn()) {
      this.adalService.handleWindowCallback();
    }
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.routerStartUrl = e.url;
      }
      if (e instanceof NavigationEnd) {
        this.routerUrl = e.url;
        let homeInner = this.routerUrl.includes('/home');
        if (this.routerUrl != '/' && this.routerUrl != '/home' && !homeInner) {
          if (!this.adalService.userInfo.authenticated) {
            this.router.navigateByUrl('/home');
          }
          this.startTimer();
        }
      }
    });
    this.isLoading = this._loaderService.isLoading;
  }

  ngOnInit() {
    localStorage.setItem('lastAction', Date.now().toString());
    this.getNotification();
    this.getAppOwner();
    this.getApplicationDetails();
    this.getAllMenu();
    this.storage.remove('AssociationEntity');
    if (this.storage.get('ResourceToken') == undefined) {
      this.getMicrosoftToken();
    }
    if (this.storage.get('BUToken') == undefined) {
      this.getTokenBU();
    }
    this.setAppInsights();
    this.appInsightService.logEvent('Message', 'Application Loaded.');
    this.getAlerts();
  }

  ngOnChanges() {
    if (this.isLoggedIn()) {
      this.adalService.logOut();
      this.router.navigate(['home']);
    }
  }

  login(event) {
    if (event) {
      this.adalService.login();
    } else if (!event) {
      this.adalService.logOut();
      this.router.navigate(['home']);
      location.reload();
    }
  }

  isLoggedIn() {
    if (this.adalService.userInfo.authenticated) {
      this.userName = this.adalService.userInfo.profile.given_name;
      return this.adalService.userInfo.authenticated;
    } else {
      this.userName = '';
      return this.adalService.userInfo.authenticated;
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
  }

  getMicrosoftToken() {
    this._appService.getMicrosoftToken().subscribe(res => {
      let token = res.result.accessToken.substring(
        1,
        res.result.accessToken.length - 1
      );
      this.storage.set('ResourceToken', res.result.accessToken);
      //this.startTimer();
    });
  }

  getTokenBU() {
    this._appService.getTokenBU().subscribe(res => {
      let token = res.result.accessToken.substring(
        1,
        res.result.accessToken.length - 1
      );
      this.storage.set('BUToken', res.result.accessToken);
      // this.startTimer();
    });
  }

  private setAppInsights() {
    try {
      const s = this.doc.createElement('script');
      s.type = 'text/javascript';
      s.innerHTML =
        'var appInsights=window.appInsights||function(a){ function b(a){c[a]=function(){var b=arguments;c.queue.push(function(){c[a].apply(c,b)})}}var c={config:a},d=document,e=window;setTimeout(function(){var b=d.createElement("script");b.src=a.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js",d.getElementsByTagName("script")[0].parentNode.appendChild(b)});try{c.cookie=d.cookie}catch(a){}c.queue=[];for(var f=["Event","Exception","Metric","PageView","Trace","Dependency"];f.length;)b("track"+f.pop());if(b("setAuthenticatedUserContext"),b("clearAuthenticatedUserContext"),b("startTrackEvent"),b("stopTrackEvent"),b("startTrackPage"),b("stopTrackPage"),b("flush"),!a.disableExceptionTracking){f="onerror",b("_"+f);var g=e[f];e[f]=function(a,b,d,e,h){var i=g&&g(a,b,d,e,h);return!0!==i&&c["_"+f](a,b,d,e,h),i}}return c }({ instrumentationKey:' +
        environment.appInsights.instrumentationKey +
        ' }); window.appInsights=appInsights,appInsights.queue&&0===appInsights.queue.length&&appInsights.trackPageView();';
      const head = this.doc.getElementsByTagName('head')[0];
      head.appendChild(s);
    } catch {}
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft == 1800) {
        this.storage.remove('ResourceToken');
        this.storage.remove('BUToken');
        this.getTokenBU();
        this.getMicrosoftToken();
        this.timeLeft = 0;
      } else {
        this.timeLeft++;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  getAllMenu() {
    // this._appService.getAllMenu().subscribe(res => {
    //   this.hamburgerMenu = res.result[0].menu;
    // });
  }
  getNotification() {
    this._appService.getNotificationList().subscribe(res => {
      if (res) {
        this.NotificationList = res.result;
      }
    });
  }
  getAppOwner() {
    this._appService.getAppOwner().subscribe(res => {
      if (res) {
        // this.Applist = res.result;
      }
    });
  }

  getApplicationDetails() {
    this._appService
      .getAllApplicationByEmail(this._adalService.userInfo.userName)
      .subscribe(res => {
        if (res) {
          if (res.result[0]) {
            this.Applist = res.result[0].applications;
            this.storage.set('privileges', res.result[0].privileges);
            this.privileges = res.result[0].privileges;
            this.storage.set('UserRole', res.result[0].role_name);
            this.appuserRole = res.result[0].role_name;
          }
        }
      });
  }
  getAlerts() {
    this._appService.getAlerts().subscribe(res => {
      this.alertObservable = res.value;
    });
  }
}
