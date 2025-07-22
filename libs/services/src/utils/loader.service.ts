import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private requestCount = 0;

  show() {

    console.log('LoaderService: Show loader');
    this.requestCount++;
    this.loadingSubject.next(true);
  }

  hide() {
        console.log('LoaderService: Hide loader');

    this.requestCount--;
    if (this.requestCount <= 0) {
      this.loadingSubject.next(false);
    }
  }
}