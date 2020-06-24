import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  verify(id: string): object {
    const json = {idtoken: id};
    this.http.post(this.verifyUrl, JSON.stringify(json), httpOptions).subscribe(
      (data) => { LoginService.response = data; }, (error) => { console.error(error); }
      );
    return LoginService.response;
  }
}
