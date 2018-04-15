import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Task} from '../../model/task';
import {AppSettings} from '../../model/app-settings';
import {User} from "../../model/user";
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

  getAuthorById(id:number):Observable<User>{
    return this.httpClient.get<User>(this.API_url + '/' + id + '/author');
  }
  getAsigneeById(id:number):Observable<User>{
    return this.httpClient.get<User>(this.API_url + '/' + id + '/asignee');
  }
  getAllByIssueID(id: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_url).map(tasks => tasks.filter(task => task.IDIssue === id));
  }

  getAllByAssignee(id: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_url + '?filter[where][IDAssignee]=' + id);
  }
  getByIdIssue(id: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_url + '?filter[where][IDIssue]=' + id);
  }
  getNbByIdIssue(id: number): Observable<{}> {
    return this.httpClient.get<{}>(this.API_url + '/count?[where][IDIssue]=' + id);
  }

  setTaskToDone(task:Task){
    return this.httpClient.put(this.API_url,task);
  }

  setTaskToUndone(task: Task){
    return this.httpClient.put(this.API_url,task);
  }


}
