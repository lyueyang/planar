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
  assignmentUrl = '/planar/api/v1.0/assignments/';

  constructor(private http: HttpClient) { }

  async fetchDataSync(subject: string): Promise<object> {
    return await this.http.get((this.assignmentUrl + subject), httpOptions).toPromise();
  }

  async submitEditSync(subject: string, info): Promise<object> {
    return await this.http.post((this.assignmentUrl + subject), JSON.stringify(info), httpOptions).toPromise();
  }

  async removeItem(id: number): Promise<object> {
    return await this.http.delete((this.assignmentUrl + id), httpOptions).toPromise();
  }
}
