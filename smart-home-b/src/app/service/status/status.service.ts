import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../model/app-settings';
import 'rxjs/add/operator/map';

@Injectable()
export class StatusService {

  cacheValues: Map<number, string> = new Map<number, string>();

  API_url = AppSettings.API_ROOT + '/Statuses';

  constructor(private httpClient: HttpClient) {
  }

  refreshCache() {
    this.getAll().subscribe(statuses => this.cacheValues = statuses);
  }

  getAll(): Observable<Map<number, string>> {
    return this.httpClient.get<JSON[]>(this.API_url).map(json => {
        const map: Map<number, string> = new Map<number, string>();
        json.forEach(field => map.set(field['id'], field['Name']));
        return map;
      }
    );
  }

  getByID(id: number): string {
    return this.cacheValues.get(id);
  }
}
