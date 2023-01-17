import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hcis-header',
  templateUrl: './hcis-header.component.html',
  styleUrls: ['./hcis-header.component.sass']
})
export class HcisHeaderComponent implements OnInit {
  @Input() title: string;

  constructor() {
    this.title = 'Announcements';
  }

  ngOnInit(): void {
  }

}
