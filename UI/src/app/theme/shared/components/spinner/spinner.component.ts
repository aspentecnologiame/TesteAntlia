import { Component, OnDestroy, ViewEncapsulation, inject, input, signal, computed } from '@angular/core';
import { Spinkit } from './spinkits';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss', './spinkit-css/sk-line-material.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  private isRouterLoading = signal(false);
  readonly isSpinnerVisible = computed(() => this.isRouterLoading() || this.loadingService.loading());
  Spinkit = Spinkit;
  readonly backgroundColor = input('#1dc4e9');
  readonly spinner = input(Spinkit.skLine);

  constructor() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.isRouterLoading.set(true);
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.isRouterLoading.set(false);
        }
      },
      () => {
        this.isRouterLoading.set(false);
      }
    );
  }

  ngOnDestroy(): void {
    this.isRouterLoading.set(false);
  }
}
