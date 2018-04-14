import {Injectable} from '@angular/core';
import {Issue} from '../../model/issue';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../model/app-settings';
import {TaskService} from '../task/task.service';
import {CategoryService} from "../category/category.service";

@Injectable()
export class IssueService {

  API_url = AppSettings.API_ROOT + '/Issues';

  constructor(private httpClient: HttpClient, private categoryService: CategoryService) {
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
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {
      const map: Issue[] = [];
      issues.forEach(field => new CategoryService(this.httpClient).getByID(field.categoryId).subscribe(value =>
        map.push(new Issue(field.id, field.Title, field.Description,
          new Date(field.Date), new Date(field.DeclarationDate), field.IDUrgency, field.categoryId, value,
          field.IDAuthor, field.IDStatus, field.IDLocation, field.Picture))))
      issues.filter(issue => issue.IDAuthor === id)
        .sort((issue1, issue2): number => {
          if (issue1.DeclarationDate < issue2.DeclarationDate) {
            return 1;
          }
          if (issue1.DeclarationDate > issue2.DeclarationDate) {
            return -1;
          }
          return 0;
        })
      return map;
    });
  }

  getDeclaredByImportance(id: number): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {
      const map: Issue[] = [];
      issues.forEach(field => new CategoryService(this.httpClient).getByID(field.categoryId).subscribe(value =>
        map.push(new Issue(field.id, field.Title, field.Description,
          new Date(field.Date), new Date(field.DeclarationDate), field.IDUrgency, field.categoryId, value,
          field.IDAuthor, field.IDStatus, field.IDLocation, field.Picture))))
      issues.filter(issue => issue.IDAuthor === id)
        .sort((issue1, issue2): number => {
          if (issue1.IDUrgency < issue2.IDUrgency) {
            return 1;
          }
          if (issue1.IDUrgency > issue2.IDUrgency) {
            return -1;
          }
          return 0;
        })
      return map;
    });
  }

  getDeclaredFilterStringAndImportance(id: number, input: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {
      const map: Issue[] = [];
      issues.forEach(field => new CategoryService(this.httpClient).getByID(field.categoryId).subscribe(value =>
        map.push(new Issue(field.id, field.Title, field.Description,
          new Date(field.Date), new Date(field.DeclarationDate), field.IDUrgency, field.categoryId, value,
          field.IDAuthor, field.IDStatus, field.IDLocation, field.Picture))))


      issues.filter(issue => issue.IDAuthor === id && issue.Title.toLowerCase().includes(input.toLowerCase())
        || issue.Description != null && issue.Description.toLowerCase().includes(input.toLowerCase()))
        .sort((issue1, issue2): number => {
          if (issue1.IDUrgency < issue2.IDUrgency) {
            return 1;
          }
          if (issue1.IDUrgency > issue2.IDUrgency) {
            return -1;
          }
          return 0;
        })
      return map;
    });
  }

  getDeclaredFilterStringAndDate(id: number, input: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {
      const map: Issue[] = [];
      issues.forEach(field => new CategoryService(this.httpClient).getByID(field.categoryId).subscribe(value =>
        map.push(new Issue(field.id, field.Title, field.Description,
          new Date(field.Date), new Date(field.DeclarationDate), field.IDUrgency, field.categoryId, value,
          field.IDAuthor, field.IDStatus, field.IDLocation, field.Picture))))
      issues.filter(issue => issue.IDAuthor === id && issue.Title.toLowerCase().includes(input.toLowerCase())
        || issue.Description != null && issue.Description.toLowerCase().includes(input.toLowerCase()))
        .sort((issue1, issue2): number => {
          if (issue1.DeclarationDate < issue2.DeclarationDate) {
            return 1;
          }
          if (issue1.DeclarationDate > issue2.DeclarationDate) {
            return -1;
          }
          return 0;
        })
      return map;
    });
  }

  getAssignedToByImportance(id: number): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {
      const map: Issue[] = [];
      issues.forEach(field=> new TaskService(this.httpClient).getNbByIdIssue(field.id)
        .subscribe(nb => {
          console.log(nb);
          if(nb["count"] > 0){
            new CategoryService(this.httpClient).getByID(field.categoryId).subscribe(value =>
              map.push(new Issue(field.id,field.Title,field.Description,
                new Date(field.Date),new Date(field.DeclarationDate),field.IDUrgency,field.categoryId,value,
                field.IDAuthor, field.IDStatus,field.IDLocation,field.Picture)))
          }

        }))
      issues.filter(issue => new TaskService(this.httpClient).getByID(issue.id)
        .map(tasks => tasks.IDAssignee === id)).sort((issue1, issue2): number => {
        if (issue1.IDUrgency < issue2.IDUrgency) {
          return 1;
        }
        if (issue1.IDUrgency > issue2.IDUrgency) {
          return -1;
        }
        return 0;
      })
      return map;
    });
  }

  getAssignedToByDate(id: number): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {
      const map: Issue[] = [];
      issues.forEach(field => new TaskService(this.httpClient).getNbByIdIssue(field.id)
        .subscribe(nb => {
          console.log(nb);
          if(nb["count"] > 0) {
            new CategoryService(this.httpClient).getByID(field.categoryId).subscribe(value =>
              map.push(new Issue(field.id, field.Title, field.Description,
                new Date(field.Date), new Date(field.DeclarationDate), field.IDUrgency, field.categoryId, value,
                field.IDAuthor, field.IDStatus, field.IDLocation, field.Picture)))
          }
        }))

      issues.filter(issue => new TaskService(this.httpClient).getByID(issue.id)
        .map(tasks => tasks.IDAssignee === id)).sort((issue1, issue2): number => {
        if (issue1.DeclarationDate < issue2.DeclarationDate) {
          return 1;
        }
        if (issue1.DeclarationDate > issue2.DeclarationDate) {
          return -1;
        }
        return 0;
      });
      return map;
    });
  }

  getAssignedToByDateAndString(id: number, input: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {
      const map :Issue[] = [];
      issues.forEach(field=>
        new TaskService(this.httpClient).getNbByIdIssue(field.id)
          .subscribe(nb => {
            console.log(nb);
            if(nb["count"] > 0){
              new CategoryService(this.httpClient).getByID(field.categoryId).subscribe(value =>
                map.push(new Issue(field.id,field.Title,field.Description,
                  new Date(field.Date),new Date(field.DeclarationDate),field.IDUrgency,field.categoryId,value,
                  field.IDAuthor, field.IDStatus,field.IDLocation,field.Picture)))
            }
          }))

      map.filter(issue => issue.Title.toUpperCase().includes(input.toUpperCase())
        || (issue.Description != null && issue.Description.toUpperCase().includes(input.toUpperCase()))
        || (issue.category != null && issue.category.toUpperCase().includes(input.toUpperCase()))
        && new TaskService(this.httpClient).getByID(issue.id)
          .map(tasks => tasks.IDAssignee === id))
        .sort((issue1, issue2): number => {
        if (issue1.DeclarationDate < issue2.DeclarationDate) {
          return 1;
        }
        if (issue1.DeclarationDate > issue2.DeclarationDate) {
          return -1;
        }
        return 0;
      });
    return map;
  });
  }

  getAssignedToByImportanceAndString(id: number, input: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {
      const map :Issue[] = [];
      issues.forEach(field=> new TaskService(this.httpClient).getNbByIdIssue(field.id)
        .subscribe(nb => {
          if(nb["count"] > 0){
            new CategoryService(this.httpClient).getByID(field.categoryId).subscribe(value =>
              map.push(new Issue(field.id,field.Title,field.Description,
                new Date(field.Date),new Date(field.DeclarationDate),field.IDUrgency,field.categoryId,value,
                field.IDAuthor, field.IDStatus,field.IDLocation,field.Picture)))
          }

        }))
      map.filter(issue => issue.Title.toUpperCase().includes(input.toUpperCase())
        || (issue.Description != null && issue.Description.toUpperCase().includes(input.toUpperCase()))
        || (issue.category != null && issue.category.toUpperCase().includes(input.toUpperCase())))
        .sort((issue1, issue2): number => {
          if (issue1.IDUrgency < issue2.IDUrgency) {
            return 1;
          }
          if (issue1.IDUrgency > issue2.IDUrgency) {
            return -1;
          }
          return 0;
        });
      return map;
    });
  }
}
