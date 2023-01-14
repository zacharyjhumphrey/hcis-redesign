import { Component, OnInit } from '@angular/core';
import { HCISDataService } from '../hcis-data-service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.sass']
})
export class LoginPopupComponent implements OnInit {
  usernameValue = '';
  passwordValue = '';

  constructor(private backendService: HCISDataService) { }

  ngOnInit(): void {
  }

  submitCredentials = (username: string, password: string) => {
    // this.backendService.postLogin(username, INSERT PASSWORD HERE).subscribe(res => console.log(res));
  }

}
