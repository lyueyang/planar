import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  public static response: object;
  verifyUrl = '/planar/api/v1.0/verify';

  constructor(private router: Router, private http: HttpClient, private oauthService: OAuthService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.http.post(
        this.verifyUrl,
        JSON.stringify({idtoken: this.oauthService.getIdToken()}),
        httpOptions)
        .toPromise().then((data: JSON) => {
          if (JSON.parse(JSON.stringify(data)).reponse === 'Successfully verified ID') {
            this.router.navigateByUrl('notetaking');
          } else {
            this.router.navigateByUrl('loginlanding');
          }
        },
        (error) => {
          console.error(error);
          this.router.navigateByUrl('loginlanding');
        });
    },
    500);
  }
}
