import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WordEditorHelperService {

  public static response: object;
  notesUrl = '/planar/api/v1.0/notes/';

  constructor(private http: HttpClient) { }

  async fetchDataSync(subject: string): Promise<object> {
    return await this.http.get((this.notesUrl + subject), httpOptions).toPromise();
  }

  async submitEditSync(subject: string, info): Promise<object> {
    return await this.http.post((this.notesUrl + subject), JSON.stringify(info), httpOptions).toPromise();
  }
}
