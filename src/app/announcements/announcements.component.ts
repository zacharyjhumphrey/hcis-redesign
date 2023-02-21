import { Component, OnInit } from '@angular/core';
import { AnnouncementsTab } from 'src/common';
import { HCISDataService } from '../hcis-data-service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.sass']
})
export class AnnouncementsComponent implements OnInit {
  pageData: AnnouncementsTab | null = null;

  constructor(private backendService: HCISDataService) {
    this.backendService.getAnnouncementsData().subscribe((data) => {
      this.pageData = data
    });
  }

  ngOnInit(): void {
  }

}
