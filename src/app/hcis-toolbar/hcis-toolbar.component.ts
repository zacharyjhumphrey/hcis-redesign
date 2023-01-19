import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hcis-toolbar',
  templateUrl: './hcis-toolbar.component.html',
  styleUrls: ['./hcis-toolbar.component.sass']
})
export class HcisToolbarComponent implements OnInit {
  @Output() toggleNavigationDrawerEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavigationDrawer = () => {
    this.toggleNavigationDrawerEvent.emit()
  }
}
