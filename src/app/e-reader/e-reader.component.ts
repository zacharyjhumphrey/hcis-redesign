import { Component, OnInit } from '@angular/core';
import { EReaderSearchParameters } from 'src/vendor/interfaces';
import { Reading } from '../../common';
import { BackendServiceService } from '../backend-service.service';
import { LocalStorageService } from '../local-storage.service';

// TODO Create clear search button
const DEFAULT_EREADER_SEARCH_PARAMETERS: EReaderSearchParameters = {
  searchValue: '',
  selectedClass: '',
  selectedProfessor: ''
};

@Component({
  selector: 'app-e-reader',
  templateUrl: './e-reader.component.html',
  styleUrls: ['./e-reader.component.sass']
})
export class EReaderComponent implements OnInit {
  searchParameters: EReaderSearchParameters = DEFAULT_EREADER_SEARCH_PARAMETERS;
  allReadings: Reading[] = [];
  filteredReadings: Reading[] = [];
  professors: string[] = [];
  classes: string[] = [];

  constructor(private backendService: BackendServiceService, private localStorageService: LocalStorageService) {
    this.backendService.getAllReadings().subscribe(readings => {
      this.allReadings = [...readings, ...this.allReadings];
      this.professors = [...new Set(this.allReadings.map(reading => reading.professor).filter(prof => prof != ''))];
      this.classes = [...new Set(this.allReadings.map(reading => reading.class).filter(className => className != ''))];
      console.log(this.allReadings);
      this.filteredReadings = this.getFilteredReadings();
    });

    // this.backendService.fetchEReaderTabContents(4310).subscribe(res => {
    //   let setCookieHeader = res.headers.get('Set-Cookie');

    //   console.log(res);
    // });
  }

  ngOnInit(): void {
    let localStorageCache = this.localStorageService.getCachedEReaderSearch();
    if (localStorageCache != null) {
      this.searchParameters = localStorageCache;
    }
  }

  updateFilteredReadings = (): void => {
    this.filteredReadings = this.getFilteredReadings();
    this.localStorageService.setCachedEReaderSearch(this.searchParameters);
  }

  clearEReaderSearchParameters() {
    this.searchParameters = {...DEFAULT_EREADER_SEARCH_PARAMETERS};
    this.updateFilteredReadings();
  }

  getFilteredReadings = (): Reading[] => {
    return this.allReadings.filter(
      (reading) =>
        this.searchParameters.selectedProfessor == '' || reading.professor == this.searchParameters.selectedProfessor
    ).filter(
      (reading) =>
        this.searchParameters.selectedClass == '' || reading.class == this.searchParameters.selectedClass
    ).filter(
      (reading) => new RegExp(this.searchParameters.searchValue, "i").test(reading.title) || new RegExp(this.searchParameters.searchValue, "i").test(reading.author)
    )
  }

  openReading(reading: Reading) {
    console.log(reading);
    // open(reading.URL);
  }
}
