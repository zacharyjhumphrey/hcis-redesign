import { Component, OnInit } from '@angular/core';
import { AnnouncementsTab } from 'src/common';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.sass']
})
export class AnnouncementsComponent implements OnInit {
  pageData: AnnouncementsTab;

  constructor(private backendService: BackendServiceService) {
    this.pageData = this.backendService.getAnnouncementsData();
    console.log(this.pageData);
  }

  ngOnInit(): void {
  }

}
