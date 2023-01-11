import { Injectable } from '@angular/core';
import { EReaderSearchParameters } from 'src/vendor/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  eReaderSearchKey: string = "eReaderSearch";

  constructor() {
  }

  setCachedEReaderSearch = (userSearchParameters: EReaderSearchParameters) => {
    console.log('storing in local storage');
    localStorage.setItem(this.eReaderSearchKey, JSON.stringify(userSearchParameters))
  }

  getCachedEReaderSearch = (): EReaderSearchParameters => {
    let storageValue = localStorage.getItem(this.eReaderSearchKey);
    return (storageValue == null) ? storageValue : JSON.parse(storageValue);
  }
}
