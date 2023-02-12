import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';

const MAX_MOBILE_WINDOW_WIDTH = 800;

@Component({
  selector: 'app-hcis-header',
  templateUrl: './hcis-header.component.html',
  styleUrls: ['./hcis-header.component.sass']
})
export class HcisHeaderComponent implements OnInit {
  @Input() title: string;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  // TODO Hamburger menu isn't centered
  // TODO (Maybe?) Create a service for window size, etc.
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia(
      `(max-width: ${MAX_MOBILE_WINDOW_WIDTH}px)`
    );
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.title = 'Announcements';
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  browserIsDesktop = () => window.innerWidth > MAX_MOBILE_WINDOW_WIDTH;

  ngOnInit(): void {
  }

}
