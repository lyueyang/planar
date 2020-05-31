import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  public isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  public login() {
    console.log('start login');
    this.oauthService.initImplicitFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  ngOnInit(): void {
  }

}
