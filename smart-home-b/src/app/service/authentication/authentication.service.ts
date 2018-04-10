import {Injectable} from '@angular/core';
import {AppSettings} from '../../model/app-settings';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthenticationService {
  private static USER_KEY: string = "User";
  private static personURL: string = AppSettings.API_ROOT + '/People';
  private static _loginURL = '/login';
  private static TOKEN_KEY: string = "token";

  static get loginURL(): string {
    return this._loginURL;
  }

  static set loginURL(value: string) {
    this._loginURL = value;
  }


  private user: User = null;
  private logged: Observable<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private httpclient: HttpClient) {
    this.httpclient = httpclient;
    if (localStorage.getItem(AuthenticationService.USER_KEY)) {
      this.user = JSON.parse(localStorage.getItem(AuthenticationService.USER_KEY));
    }
  }

  createUser(user: User): Observable<JSON> {
    return this.httpclient.post<JSON>(AuthenticationService.personURL, user);
  }

  login(user: User): Observable<JSON> {
    this.user = user;
    localStorage.removeItem(AuthenticationService.TOKEN_KEY);
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

  isLogged(): Observable<boolean> {
    return this.logged;
  }

  getToken(): string {
    if (this.isTokenValid()) {
      return localStorage.getItem(AuthenticationService.TOKEN_KEY);
    }
    return null;
  }

  getUser() {
    return this.user;
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  private aknowledgeLogin(response: JSON) {

    this.user.idUser = response['userId'];

    if (response["id"] != undefined)
      this.setToken(response["id"], response["ttl"]);
    localStorage.setItem(AuthenticationService.USER_KEY, JSON.stringify(this.user));
  }

  private setToken(token: string, ttl: number) {
    this.user.token = token;
    localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
    let time: Date = new Date();
    localStorage.setItem("Expire", String(time.getTime() + ttl));
  }

  private isTokenValid() {
    let expire: Date = new Date(parseInt(localStorage.getItem("Expire")));
    return new Date() <= expire;
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
