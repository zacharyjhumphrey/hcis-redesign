import { Component } from '@angular/core';

interface NavigationTab {
  name: string,
  route: string
  icon: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'hcis-redesign';
  pages: NavigationTab[] = [{
    name: 'Home Page',
    route: '/',
    icon: 'alarm'
  }, {
    name: 'eReader',
    route: '/e-reader',
    icon: 'book'
  }, {
    name: 'Personal Data',
    route: '/personal-data',
    icon: 'person'
  },
  {
    name: 'Thesis Search',
    route: '/thesis-search',
    icon: 'search'
  }];
// TODO Resize everything with em
  constructor() {
    // getAnnouncementsTab()
  }
}
