import { AfterViewInit, ChangeDetectorRef, Component, inject, Inject, NgZone, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TabTrackerService, NetworkStatusService } from '@datum/utils';
import { LoaderComponent } from '@datum/ui';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoaderInterceptor } from '@datum/http';
import { LoaderService } from '@datum/services';

@Component({
  imports: [CommonModule, NxWelcome, RouterModule, LoaderComponent],
  providers: [TabTrackerService,  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App  implements AfterViewInit, OnInit {
  //loading = false;
    isOnline = true;

  router = inject(Router);
  tabTracker = inject(TabTrackerService);
  loaderService: LoaderService = inject(LoaderService);
  http = inject(HttpClient);
  ngZone = inject(NgZone);
  networkService = inject(NetworkStatusService);
   changeDetector = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loaderService.show();
     this.networkService.getNetworkStatus().subscribe((status) => {
      this.isOnline = status;
    });
  }

  constructor() {
    this.tabTracker.initTracker();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });
  }

  ngAfterViewInit(): void {
      this.loaderService.hide();
  }
  // ngOnInit() {
  //   /*this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe({
  //     next: (data) => console.log('HTTP GET response:', data),
  //     error: (err) => console.error('HTTP GET error:', err)
  //   });*/
    
  // }
 // private tabTracker = Inject(TabTrackerService);
       protected title = 'datumhostapp';
       
          
}
