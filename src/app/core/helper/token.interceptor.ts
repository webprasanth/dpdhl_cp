import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdalService } from 'adal-angular4';
import { API } from './../../../environments/environment';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private adalService: AdalService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (request.url.includes('https://sigfcp.azurewebsites.net/')) {
      const requestUrl: string = request.url;
      request = request.clone({
        url: requestUrl,
        // 'Authorization': {
        // username: 5ca4a93fe833d97655ae1de1,
        // password: 353a66754599d6a201eab14e6f401cb3
        // }
        // 'Basic ' +
        // btoa('5ca4a93fe833d97655ae1de1:353a66754599d6a201eab14e6f401cb3')
        setHeaders: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
          Authorization:
            'Basic ' +
            btoa('5ca4a93fe833d97655ae1de1:353a66754599d6a201eab14e6f401cb3')
        }
      });
    } else if (request.url.includes('https://api.sendgrid.com/v3/mail/send')) {
      const requestUrl: string = request.url;
      request = request.clone({
        url: requestUrl,
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          Authorization: `Bearer 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`
        }
      });
    } else if (request.url.includes('https://graph.microsoft.com')) {
      const requestUrl: string = request.url;
      request = request.clone({
        url: requestUrl,
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: `Bearer ${this.storage.get('BUToken')}`
        }
      });
    } else if (request.url.includes('https://management.azure.com')) {
      const requestUrl: string = request.url;
      request = request.clone({
        url: requestUrl,
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.storage.get('ResourceToken')}`
        }
      });
    } else if (request.url.includes('https://api.applicationinsights.io')) {
      const requestUrl: string = request.url;
      request = request.clone({
        url: requestUrl,
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          'x-api-key': 'q4jdp6swt4015amrj0681s0xs5r4opotc4f5sfv3'
        }
      });
    } else {
      const currentUser = this.adalService.userInfo.authenticated;
      const requestUrl: string = API.apiUrl + '/' + request.url;
      request = request.clone({
        // url: `${request.url}`
        url: requestUrl
      });

      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.adalService.userInfo.token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
