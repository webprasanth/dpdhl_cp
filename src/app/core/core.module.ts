import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './utilities/authGuard/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './helper/token.interceptor';
import { LoaderInterceptor } from './helper/loader.interceptor';
import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthGuard]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true
        },
        LoaderService
      ]
    };
  }
}
