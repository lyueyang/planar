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

  public static response: object;
  moduleUrl = '/planar/api/v1.0/modules';

  constructor(private http: HttpClient) { }

  async fetchDataSync(): Promise<object> {
    return await this.http.get(this.moduleUrl, httpOptions).toPromise();
  }
}
