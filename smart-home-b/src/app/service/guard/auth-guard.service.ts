import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private authService: AuthenticationService;

  constructor(authService: AuthenticationService, private router: Router) {
    this.authService = authService;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('authGuard');
    console.log(this.authService.isLogged().getValue());

    if (this.authService.isLogged().getValue()) {
      return true;
    }
    this.router.navigate(['connexion']);
    return false;
  }
}
