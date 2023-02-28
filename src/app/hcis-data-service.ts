import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAnnouncementsTab, getNavTabs, parseReadingsFromPage, getThesesFromResponse, wasLoginSuccess, getSECToken } from 'src/vendor/old-hcis-parser';
import { Reading, Thesis } from 'src/common';
import * as md5 from 'md5';
import { concatAll, forkJoin, map, mergeAll, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HCISDataService {
  token: string;

  constructor(private http: HttpClient) {
    this.token = '';
  }

  postLogin = (username: string, password: string) => {
    let body = new URLSearchParams();
    body.set('logPg', '3');
    body.set('uname', username);
    body.set('pwaenc', md5(password));
    let _this = this;

    return this.http.post("/hcis/stu/stuPage101.inc.php", body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text',
      withCredentials: true
    }).pipe(
      map((htmlResponse: string) => {
        let successStatus = wasLoginSuccess(htmlResponse);
        if (successStatus.success) {
          _this.token = getSECToken(htmlResponse)!!;
        }
        return successStatus;
      })
    )
  }

  getCrazyQuotes = () => {
    return this.http.get("https://honors.uca.edu/hcis/stu/stuPage666.inc.php?cmd=tabWrite&pageTab=666");
  }

  getAllReadings = (): Observable<Reading[]> => {
    return forkJoin([
      this.getEReaderCoreIReadings(),
      this.getEReaderCoreIIReadings(),
      this.getEReaderCoreIIIReadings(),
      this.getEReaderCoreIVReadings(),
      this.getEReaderJuniorSeminarReadings(),
      this.getEReaderSeniorSeminarReadings(),
      this.getEReaderOtherReadings(),
      this.getEReaderTutorialReadings(),
      this.getEReaderThesisReadings()
    ]).pipe(mergeAll());
  }

  getThesisWithSearchTerm = (searchText: string, searchConnect: string): Thesis[] => {
    // let reposnse = this.http.post("https://honors.uca.edu/hcis/stu/stuPage340.inc.php?cmd=search", {
    //   searchText,
    //   searchConnect
    // });
    let response = 'THIS IS A TEST STRING';

    return getThesesFromResponse(response);
  }

  // TODO Test whether or not calls to HCIS will be properly made in build
  // TODO Find a way to fix being on e-reader and the 404 being a repsonse
  // TODO Add spinner to loading components for home and e-reader pages
  // TODO Create persisting login attempts with local storage
  // TODO Faculty hours page?
  // TODO Check for implementation of not allowing users to submit login requests in current HCIS
  // TODO Add timer to login wait time
  // TODO _checkClock is not defined

  getAnnouncementsData = () => {
    let body = new URLSearchParams();
    body.set('secToken', this.token);
    body.set('cmd', "page");
    body.set('sendTab', "040");
    body.set('pageTab', "040");
    body.set('defTab', "-1");
    
    return this.http.post(`/hcis/stu/stuPage040.inc.php`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text',
      withCredentials: true
    }).pipe(
      map((htmlResponse: string) => getAnnouncementsTab(htmlResponse))
    )
  }

  fetchEReaderTabContents = (classTabNumber: number, className: string) => {
    let body = new URLSearchParams();
    body.set('tab', classTabNumber.toString());
    body.set('sendTab', "901");
    body.set('secToken', this.token);
    body.set('referTab', "666");
    return this.http.post(`/hcis/stu/stuPage901.inc.php?cmd=contents`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text',
      withCredentials: true
    }).pipe(
      map((htmlResponse: string) => parseReadingsFromPage(htmlResponse, className))
    )
  }

  getEReaderCoreIReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(1310, "Core I");
  getEReaderCoreIIReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(1320, "Core II");
  getEReaderCoreIIIReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(2310, "Core III");
  getEReaderCoreIVReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(2320, "Core IV");
  getEReaderJuniorSeminarReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(3310, "Junior Seminar");
  getEReaderSeniorSeminarReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(4310, "Senior Seminar");
  getEReaderTutorialReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(3320, "Tutorial");
  getEReaderThesisReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(4320, "Thesis");
  getEReaderOtherReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(5000, "Other");
}
