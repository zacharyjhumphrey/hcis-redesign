import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, HostListener, Injectable } from '@angular/core';

const MAX_MOBILE_WINDOW_WIDTH = 600;

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  // TODO Implement
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia(
      `(max-width: ${MAX_MOBILE_WINDOW_WIDTH}px)`
    );
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // TODO
  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {

  // }

  browserIsDesktop = () => window.innerWidth > MAX_MOBILE_WINDOW_WIDTH;
}
