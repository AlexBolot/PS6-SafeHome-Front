import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../model/app-settings';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class CategoryService {
  API_url = AppSettings.API_ROOT + '/categories';
  constructor(private httpClient: HttpClient) {
  }


  getAll(): Observable<Map<Number, String>> {
    return this.httpClient.get<JSON[]>(this.API_url).map(json => {
        const map: Map<Number, String> = new Map<Number, String>();
        json.forEach(field => map.set(field['id'], field['name']));
        return map;
      }
    );
  }
  getLabels(): Observable<String[]> {
    return this.httpClient.get<JSON[]>(this.API_url).map(json => {
      const res: String[] = [];
      json.forEach(field => res.push(field['name']));
      return res;
    });
  }

  getByID(id: number): Observable<String> {
    return this.httpClient.get<JSON>(this.API_url + '/' + id)
      .map(res => res['name']);
  }
}
