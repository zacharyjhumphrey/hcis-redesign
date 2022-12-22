import { Component } from '@angular/core';
import { getAnnouncementsTab } from 'src/vendor/backend-interface';

interface Page {
  name: string,
  route: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'hcis-redesign';
  pages: Page[] = [{
    name: 'Home Page',
    route: '/'
  }, {
    name: 'eReader',
    route: '/e-reader'
  }];
  
  constructor() {
    // getAnnouncementsTab()
  }
}
