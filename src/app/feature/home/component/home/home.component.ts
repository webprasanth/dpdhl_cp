import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { Router } from '@angular/router';
import { AD_CONFIG } from 'src/environments/environment';

@Component({
  selector: 'dpdhl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userLoggedIn: boolean;
  constructor(private adalService: AdalService, private router: Router) {
    this.userLoggedIn = !adalService.userInfo.authenticated;
    if (this.adalService.userInfo.authenticated) {
      this.router.navigate(['/', 'dashboard']);
    }
  }

  ngOnInit() {}
}
