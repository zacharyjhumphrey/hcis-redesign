import { Component, OnInit } from '@angular/core';
import { Thesis } from 'src/common';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-thesis-search',
  templateUrl: './thesis-search.component.html',
  styleUrls: ['./thesis-search.component.sass']
})
export class ThesisSearchComponent implements OnInit {
  fetchedTheses: Thesis[];
  searchValue: string;
  searchConnectTerm: "AND" | "OR" = "AND";

  constructor(private backendService: BackendServiceService) {
    this.fetchedTheses = this.backendService.getThesisWithSearchTerm("", "AND");
    this.searchValue = '';
  }

  ngOnInit(): void {
  }

  searchTheses = (searchTerm: string, searchConnectTerm: "AND" | "OR") => {
    this.fetchedTheses = this.backendService.getThesisWithSearchTerm(searchTerm, searchConnectTerm);
  }

  openThesisFile = (clickedThesis: Thesis) => {
    if (!clickedThesis.fileLink) {
      return;
    }
    // open(clickedThesis.fileLink);
  }
}
