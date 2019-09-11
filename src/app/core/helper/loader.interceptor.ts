import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdalService } from 'adal-angular4';
import { API } from './../../../environments/environment';
import { LoaderService } from '../services/loader.service';
import { finalize, tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(private _loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this._loaderService.show();
    // return next
    //   .handle(request)
    //   .pipe(finalize(() => this._loaderService.hide()));
    // &&
    // !request.url.includes('azure/fetchAccesstokenFromGraph') &&
    // !request.url.includes('azure/fetchAccessToken')
    if (
      !request.url.includes('https://dc.services.visualstudio.com/v2/track') ||
      !request.url.includes('azure/fetchAccessToken') ||
      !request.url.includes('azure/fetchAccesstokenFromGraph')
    ) {
      return next.handle(request).pipe(
        tap(res => {
          if (res instanceof HttpResponse) {
            this.decreaseRequests();
          }
        }),
        catchError(err => {
          this.decreaseRequests();
          throw err;
        })
      );
    }
  }
  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this._loaderService.hide();
    }
  }
}
