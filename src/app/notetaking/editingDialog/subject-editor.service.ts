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
export class SubjectEditorService {

  public static response: object;
  moduleUrl = '/planar/api/v1.0/modules';

  constructor(private http: HttpClient) { }

  fetchData(): object {
    this.http.get(this.moduleUrl, httpOptions).subscribe(
      (data) => {SubjectEditorService.response = data; },
      (error) => {console.error(error); }
    );
    return SubjectEditorService.response;
  }

  async fetchDataSync(): Promise<object> {
    return await this.http.get(this.moduleUrl, httpOptions).toPromise();
  }

  submitEdit(info): object {
    this.http.post(this.moduleUrl, JSON.stringify(info), httpOptions).subscribe(
      (data) => {SubjectEditorService.response = data; },
      (error) => {console.error(error); }
    );

    return SubjectEditorService.response;
  }

  async submitEditSync(info): Promise<object> {
    return await this.http.post(this.moduleUrl, JSON.stringify(info), httpOptions).toPromise();
  }
}
