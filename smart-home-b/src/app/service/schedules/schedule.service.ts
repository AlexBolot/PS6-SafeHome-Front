import {Injectable} from '@angular/core';
import {AppSettings} from '../../model/app-settings';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Schedule} from '../../model/schedule';

@Injectable()
export class ScheduleService {
  API_url = AppSettings.API_ROOT + '/schedules';
  jsonObject: JSON;

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(this.API_url);
  }

  getByID(id: number): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(this.API_url + '/' + id);
  }

  add(schedules: Schedule) {
    this.jsonObject = JSON.parse("{\n" +
      "  \"start\": \""+schedules.start+"\",\n" +
      "  \"end\": \""+schedules.end+"\",\n" +
      "  \"auto\": "+schedules.auto+",\n" +
      "  \"domotic-itemId\": "+schedules.domoticitemId+"\n" +
      "}");
    return this.httpClient.post<JSON>(this.API_url, this.jsonObject);
  }

  put(schedules: Schedule) {
    this.jsonObject = JSON.parse("{\n" +
      "  \"start\": \""+schedules.start+"\",\n" +
      "  \"end\": \""+schedules.end+"\",\n" +
      "  \"auto\": "+schedules.auto+",\n" +
      "  \"id\": "+schedules.id+",\n" +
      "  \"domotic-itemId\": "+schedules.domoticitemId+"\n" +
      "}");
    return this.httpClient.put<JSON>(this.API_url, this.jsonObject);
  }

}
