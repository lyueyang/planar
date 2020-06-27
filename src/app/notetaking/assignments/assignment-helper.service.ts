import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AssignmentHelperService {

  public static response: object;
  retrieveUrl = '/planar/api/v1.0/get_assignments';
  submitUrl = '/planar/api/v1.0/update_assignments';

  constructor(private http: HttpClient) { }

  fetchData(): object {
    this.http.get(this.retrieveUrl, httpOptions).subscribe(
      (data) => {AssignmentHelperService.response = data; },
      (error) => {console.error(error); }
    );
    return AssignmentHelperService.response;
  }

  submitEdit(info): object {
    this.http.post(this.submitUrl, JSON.stringify(info), httpOptions).subscribe(
      (data) => {AssignmentHelperService.response = data; },
      (error) => {console.error(error); }
    );

    return AssignmentHelperService.response;
  }
}
