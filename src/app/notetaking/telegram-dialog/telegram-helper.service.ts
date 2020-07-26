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
  telegramUrl = '/planar/api/v1.0/get_tele_token';

  constructor(private http: HttpClient) { }

  async getToken(): Promise<string> {
    return await this.http.get(this.telegramUrl, {responseType: 'text'}).toPromise();
  }
}
