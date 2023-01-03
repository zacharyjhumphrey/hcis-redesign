import { Component, OnInit } from '@angular/core';
import { Reading } from '../../common';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-e-reader',
  templateUrl: './e-reader.component.html',
  styleUrls: ['./e-reader.component.sass']
})
export class EReaderComponent implements OnInit {
  allReadings: Reading[];
  filteredReadings: Reading[];
  professors: string[];
  classes: string[];
  selectedClass: string;
  selectedProfessor: string;
  searchValue: string;

  constructor(private backendService: BackendServiceService) {
    this.allReadings = this.backendService.getAllReadings();
    this.professors = [...new Set(this.allReadings.map(reading => reading.professor).filter(prof => prof != ''))];
    this.classes = [...new Set(this.allReadings.map(reading => reading.class).filter(className => className != ''))];
    this.selectedClass = '';
    this.selectedProfessor = '';
    this.filteredReadings = this.getFilteredReadings();
    this.searchValue = '';
  }

  ngOnInit(): void {
    // this.backendService.getCrazyQuotes().subscribe((data) => {
    //   console.log(data);
    // })
  }

  updateFilteredReadings = (): void => {
    this.filteredReadings = this.getFilteredReadings();
  }

  getFilteredReadings = (): Reading[] => {
    return this.allReadings.filter(
      (reading) =>
        this.selectedProfessor == '' || reading.professor == this.selectedProfessor
    ).filter(
      (reading) =>
        this.selectedClass == '' || reading.class == this.selectedClass
    ).filter(
      (reading) => new RegExp(this.searchValue, "i").test(reading.title) || new RegExp(this.searchValue, "i").test(reading.author)
    )
  }

  openReading(reading: Reading) {
    console.log(reading);
    // open(reading.URL);
  }
}
