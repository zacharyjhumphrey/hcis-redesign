import { Component } from '@angular/core';
import { getNavTabs, getTabContent } from 'src/vendor/backend-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'hcis-redesign';
  constructor() {
    getTabContent()
  }
}
