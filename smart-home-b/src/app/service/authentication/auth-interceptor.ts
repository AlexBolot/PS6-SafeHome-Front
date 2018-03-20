import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  private authService: AuthenticationService;
  constructor(authenticationService:AuthenticationService){
    this.authService = authenticationService;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let params = req.params;
    if (this.authService.isLogged())
    {
      params = params.set("access_token",this.authService.getUser().token);
      req = req.clone({params:params});

    }
    return next.handle(req);
  }
}
