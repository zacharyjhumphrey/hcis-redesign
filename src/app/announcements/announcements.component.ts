import { Component, OnInit } from '@angular/core';
import { getReadingsFromAllClasses } from 'src/vendor/backend-interface';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.sass']
})
export class AnnouncementsComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
