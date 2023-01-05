import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.sass']
})
export class AnnouncementsComponent implements OnInit {
  constructor(private backendService: BackendServiceService) {
    // this.backendService.postLogin("zachjhumphrey", INSERT PASSWORD HERE).subscribe(res => console.log(res));
  }

  ngOnInit(): void {
  }

}
