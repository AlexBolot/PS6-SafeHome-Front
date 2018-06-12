import { Injectable } from '@angular/core';
import {Domotic} from "../../model/domotic";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Issue} from "../../model/issue";
import {AppSettings} from "../../model/app-settings";

@Injectable()
export class DomoticService {
  API_url = AppSettings.API_ROOT + '/Domotic-Items';

  constructor(private httpClient: HttpClient,) { }


  getAll(): Observable<Domotic[]> {
    return this.httpClient.get<Domotic[]>(this.API_url);
  }

  getByID(id: number): Observable<Domotic> {
    return this.httpClient.get<Domotic>(this.API_url + '/' + id);
  }

  add(domoticItem: Domotic) {
    return this.httpClient.post<JSON>(this.API_url, domoticItem);
  }

  put(domoticItem: Domotic) {
    return this.httpClient.put<Issue>(this.API_url,domoticItem);
  }

}
