import { Injectable, Inject } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AdalService } from 'adal-angular4';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const MINUTES_UNITL_AUTO_LOGOUT = 29// in mins
const CHECK_INTERVAL = 0// in ms
const STORE_KEY = 'lastAction';
@Injectable()
export class AutoLogoutService {
  routerStartUrl: string;
  routerUrl: string;
  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router, private adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService) {
    this.check();
    this.initListener();
    this.initInterval();
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {

      localStorage.clear();
      if (!localStorage.getItem('lastAction')) {
        this.adalService.logOut();
        this.storage.remove('ResourceToken');
        this.storage.remove('BUToken');
      }
    }
  }
}
