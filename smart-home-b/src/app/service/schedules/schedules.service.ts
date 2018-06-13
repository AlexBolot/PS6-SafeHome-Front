import { Injectable } from '@angular/core';
import {AppSettings} from "../../model/app-settings";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Issue} from "../../model/issue";
import {Schedules} from "../../model/schedules";

@Injectable()
export class SchedulesService {
  API_url = AppSettings.API_ROOT + '/schedules';
  jsonObject:JSON;
  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<Schedules[]> {
    return this.httpClient.get<Schedules[]>(this.API_url);
  }
  getByID(id: number): Observable<Schedules[]> {
    return this.httpClient.get<Schedules[]>(this.API_url + '/' + id);
  }

  add(schedules: Schedules) {
    this.jsonObject=JSON.parse("{\n" +
      "  \"start\": \""+schedules.start.toString()+"\",\n" +
      "  \"end\": \""+schedules.end.toString()+"\",\n" +
      "  \"domotic-itemId\":"+schedules.domoticitemId+"\n" +
      "}");
    return this.httpClient.post<JSON>(this.API_url,this.jsonObject);
  }
  put(schedules:Schedules){
    this.jsonObject=JSON.parse("{\n" +
      "  \"start\": \""+schedules.start+"\",\n" +
      "  \"end\": \""+schedules.end+"\",\n" +
      "  \"id\": "+schedules.id+",\n" +
      "  \"domotic-itemId\": "+schedules.domoticitemId+"\n" +
      "}");
    return this.httpClient.put<JSON>(this.API_url,this.jsonObject);
  }

}
