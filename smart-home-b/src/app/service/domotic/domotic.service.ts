import {Injectable} from '@angular/core';
import {Domotic} from '../../model/domotic';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Issue} from '../../model/issue';
import {AppSettings} from '../../model/app-settings';
import {Schedule} from '../../model/schedule';

@Injectable()
export class DomoticService {
  API_url = AppSettings.API_ROOT + '/Domotic-Items';

  constructor(private httpClient: HttpClient,) {
  }

  getAll(): Observable<Domotic[]> {
    return this.httpClient.get<Domotic[]>(this.API_url);
  }

  getSchedules(id: number): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(this.API_url + '/' + id + '/schedules');
  }

}
