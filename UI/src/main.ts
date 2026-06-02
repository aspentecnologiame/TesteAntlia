/// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom, inject } from '@angular/core';

import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { LoadingService } from './app/core/services/loading.service';

const loadingHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();
  return next(req).pipe(finalize(() => loadingService.hide()));
};

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideAnimations(),
    provideHttpClient(withInterceptors([loadingHttpInterceptor]))
  ]
}).catch((err) => console.error(err));
