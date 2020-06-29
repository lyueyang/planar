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
  assignmentUrl = '/planar/api/v1.0/assignments';

  constructor(private http: HttpClient) { }

  fetchData(): object {
    this.http.get(this.assignmentUrl, httpOptions).subscribe(
      (data) => {AssignmentHelperService.response = data; },
      (error) => {console.error(error); }
    );
    return AssignmentHelperService.response;
  }

  async fetchDataSync(): Promise<object> {
    return await this.http.get(this.assignmentUrl, httpOptions).toPromise();
  }

  submitEdit(info): object {
    this.http.post(this.assignmentUrl, JSON.stringify(info), httpOptions).subscribe(
      (data) => {AssignmentHelperService.response = data; },
      (error) => {console.error(error); }
    );

    return AssignmentHelperService.response;
  }

  async submitEditSync(info): Promise<object> {
    return await this.http.post(this.assignmentUrl, JSON.stringify(info), httpOptions).toPromise();
  }
}
