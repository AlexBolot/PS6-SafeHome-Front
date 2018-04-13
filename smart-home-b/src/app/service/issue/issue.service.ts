import {Injectable} from '@angular/core';
import {Issue} from '../../model/issue';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../model/app-settings';
import {TaskService} from '../task/task.service';

@Injectable()
export class IssueService {

  API_url = AppSettings.API_ROOT + '/Issues';

  constructor(private httpClient: HttpClient, private taskService: TaskService) {
  }

  getAll(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url);
  }

  getByID(id: number): Observable<Issue> {
    return this.httpClient.get<Issue>(this.API_url + '/' + id);
  }

  add(issue: Issue) {
    console.log(issue);
    return this.httpClient.post<JSON>(this.API_url, issue);
  }

  getDeclaredByDate(id: number): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => issue.IDAuthor === id)
        .sort((issue1, issue2): number => {
          if (issue1.DeclarationDate < issue2.DeclarationDate) {
            return 1;
          }
          if (issue1.DeclarationDate > issue2.DeclarationDate) {
            return -1;
          }
          return 0;
        }));
  }

  getDeclaredByImportance(id: number): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => issue.IDAuthor === id)
        .sort((issue1, issue2): number => {
          if (issue1.IDUrgency < issue2.IDUrgency) {
            return 1;
          }
          if (issue1.IDUrgency > issue2.IDUrgency) {
            return -1;
          }
          return 0;
        }));
  }

  getDeclaredFilterStringAndImportance(id: number, input: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => issue.IDAuthor === id && issue.Title.toLowerCase().includes(input.toLowerCase())
        || issue.Description != null && issue.Description.toLowerCase().includes(input.toLowerCase()))
        .sort((issue1, issue2): number => {
          if (issue1.IDUrgency < issue2.IDUrgency) {
            return 1;
          }
          if (issue1.IDUrgency > issue2.IDUrgency) {
            return -1;
          }
          return 0;
        }));
  }

  getDeclaredFilterStringAndDate(id: number, input: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => issue.IDAuthor === id && issue.Title.toLowerCase().includes(input.toLowerCase())
        || issue.Description != null && issue.Description.toLowerCase().includes(input.toLowerCase()))
        .sort((issue1, issue2): number => {
          if (issue1.DeclarationDate < issue2.DeclarationDate) {
            return 1;
          }
          if (issue1.DeclarationDate > issue2.DeclarationDate) {
            return -1;
          }
          return 0;
        }));
  }

  getAssignedToByImportance(id: number): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => new TaskService(this.httpClient).getByID(issue.id)
        .map(tasks => tasks.IDAssignee === id)).sort((issue1, issue2): number => {
        if (issue1.IDUrgency < issue2.IDUrgency) {
          return 1;
        }
        if (issue1.IDUrgency > issue2.IDUrgency) {
          return -1;
        }
        return 0;
      }));
  }

  getAssignedToByDate(id: number): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => new TaskService(this.httpClient).getByID(issue.id)
        .map(tasks => tasks.IDAssignee === id)).sort((issue1, issue2): number => {
        if (issue1.DeclarationDate < issue2.DeclarationDate) {
          return 1;
        }
        if (issue1.DeclarationDate > issue2.DeclarationDate) {
          return -1;
        }
        return 0;
      }));
  }

  getAssignedToByDateAndString(id: number, input: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => issue.Title.toLowerCase().includes(input.toLowerCase())
        || issue.Description != null && issue.Description.toLowerCase().includes(input.toLowerCase())
        && new TaskService(this.httpClient).getByID(issue.id)
          .map(tasks => tasks.IDAssignee === id)).sort((issue1, issue2): number => {
        if (issue1.DeclarationDate < issue2.DeclarationDate) {
          return 1;
        }
        if (issue1.DeclarationDate > issue2.DeclarationDate) {
          return -1;
        }
        return 0;
      }));
  }

  getAssignedToByImportanceAndString(id: number, input: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => issue.Title.toLowerCase().includes(input.toLowerCase())
        || issue.Description != null && issue.Description.toLowerCase().includes(input.toLowerCase())
        && new TaskService(this.httpClient).getByID(issue.id)
          .map(tasks => tasks.IDAssignee === id)).sort((issue1, issue2): number => {
        if (issue1.IDUrgency < issue2.IDUrgency) {
          return 1;
        }
        if (issue1.IDUrgency > issue2.IDUrgency) {
          return -1;
        }
        return 0;
      }));
  }
}
