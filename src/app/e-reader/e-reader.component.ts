import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { EReaderSearchParameters } from 'src/vendor/interfaces';
import { Reading } from '../../common';
import { HCISDataService } from '../hcis-data-service';
import { LocalStorageService } from '../local-storage.service';

const DEFAULT_EREADER_SEARCH_PARAMETERS: EReaderSearchParameters = {
  searchValue: '',
  selectedClass: '',
  selectedProfessor: '',
};

const MAX_MOBILE_WINDOW_WIDTH = 600;
@Component({
  selector: 'app-e-reader',
  templateUrl: './e-reader.component.html',
  styleUrls: ['./e-reader.component.sass'],
})
export class EReaderComponent implements OnInit {
  searchParameters: EReaderSearchParameters = DEFAULT_EREADER_SEARCH_PARAMETERS;
  allReadings: Reading[] = [];
  filteredReadings: Reading[] = [];
  professors: string[] = [];
  classes: string[] = [];
  showSearchOptions: boolean;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private backendService: HCISDataService,
    private localStorageService: LocalStorageService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.backendService.getAllReadings().subscribe((readings) => {
      this.allReadings = [...readings, ...this.allReadings];
      this.professors = [
        ...new Set(
          this.allReadings
            .map((reading) => reading.professor)
            .filter((prof) => prof != '')
        ),
      ];
      this.classes = [
        ...new Set(
          this.allReadings
            .map((reading) => reading.class)
            .filter((className) => className != '')
        ),
      ];
      this.filteredReadings = this.getFilteredReadings();
    });

    this.showSearchOptions = this.browserIsDesktop();

    this.mobileQuery = media.matchMedia(
      `(max-width: ${MAX_MOBILE_WINDOW_WIDTH}px)`
    );
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // TODO Sticky header on mobile
  ngOnInit(): void {
    let localStorageCache = this.localStorageService.getCachedEReaderSearch();
    if (localStorageCache != null) {
      this.searchParameters = localStorageCache;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.showSearchOptions = this.browserIsDesktop();
  }

  clearSearchValue = () => {
    this.searchParameters.searchValue = '';
    this.updateFilteredReadings();
  };

  browserIsDesktop = () => window.innerWidth > MAX_MOBILE_WINDOW_WIDTH;

  toggleSearchOptions = () =>
    (this.showSearchOptions = !this.showSearchOptions);

  searchValueChanged = () => {
    this.updateFilteredReadings();
    if (!this.browserIsDesktop()) {
      this.showSearchOptions = false;
    }
  };

  updateFilteredReadings = (): void => {
    this.filteredReadings = this.getFilteredReadings();
    this.localStorageService.setCachedEReaderSearch(this.searchParameters);
  };

  getFilteredReadings = (): Reading[] => {
    // console.dir(this.searchParameters);
    return this.allReadings
      .filter(
        (reading) =>
          this.searchParameters.selectedProfessor == '' ||
          this.searchParameters.selectedProfessor == undefined ||
          reading.professor == this.searchParameters.selectedProfessor
      )
      .filter(
        (reading) =>
          this.searchParameters.selectedClass == '' ||
          this.searchParameters.selectedClass == undefined ||
          reading.class == this.searchParameters.selectedClass
      )
      .filter(
        (reading) =>
          this.searchParameters.searchValue == '' ||
          this.searchParameters.searchValue == undefined ||
          new RegExp(this.searchParameters.searchValue, 'i').test(
            reading.title
          ) ||
          new RegExp(this.searchParameters.searchValue, 'i').test(
            reading.author
          )
      );
  };

  additionalOptionsAreEmpty = () =>
    this.searchParameters.selectedClass == undefined &&
    this.searchParameters.selectedProfessor == undefined;

  openReading(reading: Reading) {
    console.log(reading);
    open(reading.URL);
  }
}
