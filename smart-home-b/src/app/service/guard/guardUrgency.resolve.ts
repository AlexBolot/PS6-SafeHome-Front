import { Injectable } from '@angular/core';

import {UrgencyService} from '../urgency/urgency.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GuardUrgencyResolve implements Resolve<any> {

  constructor(private urgencyService: UrgencyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('resolve Urgency activated');
    return this.urgencyService.getAll();
  }

}
