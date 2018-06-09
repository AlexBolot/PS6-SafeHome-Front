import {Injectable} from '@angular/core';
import {AppSettings} from '../../model/app-settings';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../model/user';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  private static USER_KEY = 'User';
  private static personURL: string = AppSettings.API_ROOT + '/People';
  private static _loginURL = '/login';
  private static TOKEN_KEY = 'token';

  static get loginURL(): string {
    return this._loginURL;
  }

  static set loginURL(value: string) {
    this._loginURL = value;
  }


  private user: User = null;
  private logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

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
    const request = this.httpclient.post<JSON>(AuthenticationService.personURL + AuthenticationService._loginURL, user);
    request.subscribe(response => this.aknowledgeLogin(response));

    return request;
  }

  logout(): Observable<JSON> {
    console.log(this.logged);
    const request = this.httpclient.post<JSON>(AuthenticationService.personURL + '/logout', '');
    request.subscribe(response => this.acknowledgeLogout(response));

    return request;
  }

  acknowledgeLogout(response: JSON) {
    localStorage.removeItem(AuthenticationService.TOKEN_KEY);
    localStorage.removeItem('Expire');
    this.logged.next(false);
  }

  isLogged(): BehaviorSubject<boolean> {
    return this.logged;
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  getUserName(id: number) {
    let parameters = new HttpParams();
    parameters = parameters.set('id', String(id));
    const options = {params: parameters};
    console.log('quering');
    return this.httpclient.get<JSON>(AuthenticationService.personURL + '/name', options);
  }

  getToken(): string {
    if (this.isTokenValid()) {
      return localStorage.getItem(AuthenticationService.TOKEN_KEY);
    }
    return null;
  }

  getProfile(user: User = null) {
    if (user == null) {
      user = this.user;
    }
    if (user === undefined) {
      return null;
    }
    const url: string = AuthenticationService.personURL + '/' + user.idUser;
    return this.httpclient.get<User>(url);
  }




  private setToken(token: string, ttl: number) {
    this.user.token = token;
    localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
    const time: Date = new Date();
    localStorage.setItem('Expire', String(time.getTime() + ttl));
  }

  getUser() {
    return this.user;
  }

  private aknowledgeLogin(response: JSON) {

    this.user.idUser = response['userId'];

    if (response['id'] !== undefined) {
      this.setToken(response['id'], response['ttl']);
    }
    localStorage.setItem(AuthenticationService.USER_KEY, JSON.stringify(this.user));
    this.logged.next(true);
  }

  private isTokenValid() {
    const expire: Date = new Date(parseInt(localStorage.getItem('Expire')));
    return new Date() <= expire;
  }

}

