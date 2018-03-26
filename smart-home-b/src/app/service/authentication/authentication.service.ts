import {Injectable} from '@angular/core';
import {AppSettings} from '../../model/app-settings';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  static get loginURL(): string {
    return this._loginURL;
  }

  static set loginURL(value: string) {
    this._loginURL = value;
  }

  private static personURL: string = AppSettings.API_ROOT + '/People';
  private static _loginURL = '/login';
  private logged: boolean = false;
  private user: User = null;

  constructor(private httpclient: HttpClient) {
    this.httpclient = httpclient;
  }

  createUser(user: User): Observable<JSON> {
    return this.httpclient.post<JSON>(AuthenticationService.personURL, user);
  }

  login(user: User): Observable<JSON> {
    this.user = user;
    this.logged = false;
    let request = this.httpclient.post<JSON>(AuthenticationService.personURL + AuthenticationService._loginURL, user);
    request.subscribe(response => this.aknowledgeLogin(response));

    return request;
  }

  getProfile(user: User = null) {
    if (user == null) user = this.user;
    if (user == undefined) return null;
    const url: string = AuthenticationService.personURL + '/' + user.idUser;
    return this.httpclient.get<User>(url);
  }

  private aknowledgeLogin(response: JSON) {

    this.user.token = response['id'];
    this.user.idUser = response['userId'];
    this.logged = true;
  }

  getUser() {
    return this.user;
  }

  isLogged() {
    return this.logged;
  }
}

//
// getUser(id: number): Observable<JSON> {
//     const url = `${this.API_url}/${id}`;
//     let parameters = new HttpParams().set("access_token","XnmhHLo2hW0xfRWyFd34RH4SusI5DJtVExYFZgGcS2vyWfhKbxQwLXcUPQTOvOzM");
//     let httpHeaders = new HttpHeaders()
//       .set('Content-Type', 'application/json');
//     return this.httpClient.get<JSON>("http://galles.io:5491/api/People/1",{params:parameters})
//   }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - username of the operation that failed
 * @param result - optional value to return as the observable result
 */
// private handleError<T>(operation = 'operation', result?: T) {
//   return (error: any): Observable<T> => {
//     log("Fetching Error");
//     // TODO: send the error to remote logging infrastructure
//     log(error); // log to console instead
//
//     // TODO: better job of transforming error for user consumption
//
//
//     return of(result as T);
//   };
// }
