import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {OAuthService} from 'angular-oauth2-oidc';
import set = Reflect.set;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public static response: object;
  verifyUrl = '/planar/api/v1.0/verify';
  logoutUrl = '/planar/api/v1.0/logout';

  constructor(private http: HttpClient, private oauthService: OAuthService) { }

  verify() {
      this.http.post(
        this.verifyUrl,
        JSON.stringify({idtoken: this.oauthService.getIdToken()}), httpOptions
      ).toPromise().then(data => console.log(data));
  }

  async postid(id: string): Promise<object> {
    return await this.http.post(this.verifyUrl, JSON.stringify({idtoken: id}), httpOptions).toPromise();
  }

  logout() {
    this.http.get(this.logoutUrl, httpOptions);
  }
}
