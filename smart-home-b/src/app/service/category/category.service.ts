import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../model/app-settings';

@Injectable()
export class CategoryService {

  cacheValues: Map<number, string> = new Map<number, string>();

  API_url = AppSettings.API_ROOT + '/categories';

  constructor(private httpClient: HttpClient) {
  }

  refreshCache() {
    this.getAll().subscribe(categories => this.cacheValues = categories);
  }

  getAll(): Observable<Map<number, string>> {
    return this.httpClient.get<JSON[]>(this.API_url).map(json => {
        const map: Map<number, string> = new Map<number, string>();
        json.forEach(field => map.set(field['id'], field['name']));
        return map;
      }
    );
  }

  getByID(id: number): string {
    return this.cacheValues.get(id);
  }
}
