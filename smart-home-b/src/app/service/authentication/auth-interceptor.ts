import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthenticationService;
  static IOT_ID = 5;

  constructor(authenticationService: AuthenticationService) {
    this.authService = authenticationService;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let params = req.params;
    let headers = req.headers;

    if (this.authService.hasToken()) {
      headers = headers.set('Authorization', this.authService.getUser().token);
      req = req.clone({headers});
    }
    return next.handle(req);
  }
}
