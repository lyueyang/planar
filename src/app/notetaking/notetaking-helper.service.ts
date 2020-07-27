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
export class NotetakingHelperService {
  moduleUrl = '/planar/api/v1.0/modules';
  datesUrl = '/planar/api/v1.0/assignmentDates';

  constructor(private http: HttpClient) { }

  async fetchDataSync(): Promise<object> {
    return await this.http.get(this.moduleUrl, httpOptions).toPromise();
  }

  async fetchDates(): Promise<object> {
    return await this.http.get(this.datesUrl, httpOptions).toPromise();
  }
}
