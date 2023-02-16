import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

interface NavigationTab {
  name: string;
  route: string;
  icon: string;
}

const MAX_MOBILE_WINDOW_WIDTH = 800;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'hcis-redesign';
  pages: NavigationTab[] = [
    {
      name: 'Home Page',
      route: '/',
      icon: 'alarm',
    },
    {
      name: 'eReader',
      route: '/e-reader',
      icon: 'book',
    },
    // {
    //   name: 'Personal Data',
    //   route: '/personal-data',
    //   icon: 'person',
    // },
    // {
    //   name: 'Thesis Search',
    //   route: '/thesis-search',
    //   icon: 'search',
    // },
  ];
  navigationDrawerOpen: boolean;
  loggedIn: boolean;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  // TODO (Maybe?) Create a service for window size, etc.
  constructor(
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.loggedIn = false;
    this.navigationDrawerOpen = this.browserIsDesktop();
    this.mobileQuery = media.matchMedia(
      `(max-width: ${MAX_MOBILE_WINDOW_WIDTH}px)`
    );
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.navigationDrawerOpen = this.browserIsDesktop();
  }

  browserIsDesktop = () => window.innerWidth > MAX_MOBILE_WINDOW_WIDTH;
  // TODO Resize everything with em

  pageLinkClicked = () => {
    if (!this.browserIsDesktop()) {
      this.navigationDrawerOpen = false;
    }
  }

  userLoggedIn = () => this.loggedIn = true;

  // TODO if mobile user goes to new page, close page navigation drawer
  // selectPageNavigation = (page: any) => {
  //   if (!this.browserIsDesktop()) {

  //   }
  // }
}
