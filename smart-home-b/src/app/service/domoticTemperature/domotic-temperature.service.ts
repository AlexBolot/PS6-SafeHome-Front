import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Issue} from '../../model/issue';
import {AppSettings} from '../../model/app-settings';
import {DomoticTemperature} from '../../model/domotic-Temperature';

@Injectable()
export class DomoticTemperatureService {
  API_url = AppSettings.API_ROOT + '/Domotic-item-temperatures';

  constructor(private httpClient: HttpClient) {
  }


  getByScheduleID(id: number): Observable<DomoticTemperature> {
    return this.httpClient.get<DomoticTemperature>(this.API_url + '?filter=' + '{"where":{"scheduleId":' + id + '}}');
  }

  add(domoticTemperature: DomoticTemperature) {
    console.log(domoticTemperature);
    return this.httpClient.post<JSON>(this.API_url, domoticTemperature);
  }

  put(domoticTemperature: DomoticTemperature) {
    return this.httpClient.put<Issue>(this.API_url, domoticTemperature);
  }

}
