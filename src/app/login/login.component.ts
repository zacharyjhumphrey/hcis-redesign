import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { HCISDataService } from '../hcis-data-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  waitingForServerResponse: boolean;
  username: string;
  password: string;
  previousAttempts: number;
  @Output() loggedInSuccess = new EventEmitter();

  constructor(
    private backendService: HCISDataService
  ) {
    this.waitingForServerResponse = false;
    this.username = '';
    this.password = '';
    this.previousAttempts = 0;
  }

  ngOnInit(): void {
  }

  logIn = () => {
    this.waitingForServerResponse = true;
    this.backendService.postLogin(this.username, this.password).subscribe(loginResponse => {
      this.waitingForServerResponse = false;

      if (loginResponse.success) {
        console.log('login was success');
        this.loggedInSuccess.emit();
        return;
      }
      console.log(loginResponse.failedAttempts);
      this.previousAttempts = loginResponse.failedAttempts!!;
    })
  }

}
