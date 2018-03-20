import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Task} from '../../model/task';
import {AppSettings} from '../../model/app-settings';

@Injectable()
export class TaskService {

  API_url = AppSettings.API_ROOT + '/Tasks';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_url);
  }

  getByID(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.API_url + '/' + id);
  }

}
