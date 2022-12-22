import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  constructor(private http: HttpClient) { }

  getCrazyQuotes = () => {
    return this.http.get("https://honors.uca.edu/hcis/stu/stuPage666.inc.php?cmd=tabWrite&pageTab=666");
  }
}
