import {Injectable} from '@angular/core';
import {Issue} from '../../model/issue';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from "../../model/app-settings";

@Injectable()
export class IssueService {

  API_url = AppSettings.API_ROOT+'/api/Issues';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url);
  }

  getByID(id: number): Observable<Issue> {
    return this.httpClient.get<Issue>(this.API_url + '/' + id);
  }

}
