import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HCISDataService } from '../hcis-data-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  waitingForServerResponse: boolean;
  username: string;
  password: string;
  @Output() loggedInSuccess = new EventEmitter();

  constructor(
    private backendService: HCISDataService
  ) {
    this.waitingForServerResponse = false;
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  logIn = () => {
    this.waitingForServerResponse = true;
    this.backendService.postLogin(this.username, this.password).subscribe(loginResponse => {
      if (loginResponse.success) {
        console.log('login was success');
        this.loggedInSuccess.emit();
      }
    })
  }

}
