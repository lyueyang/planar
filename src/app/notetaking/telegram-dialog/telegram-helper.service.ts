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
export class TelegramHelperService {
  telegramUrl = '/planar/api/v1.0/telegram';

  constructor(private http: HttpClient) { }

  async submit(info): Promise<object> {
    return await this.http.post(this.telegramUrl, JSON.stringify(info), httpOptions).toPromise();
  }
}
