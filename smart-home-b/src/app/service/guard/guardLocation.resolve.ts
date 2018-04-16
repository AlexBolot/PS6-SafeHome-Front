import { Injectable } from '@angular/core';

import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LocationService} from '../location/location.service';

@Injectable()
export class GuardLocationResolve implements Resolve<any> {

  constructor(private locationService: LocationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('resolve locationName activated');
    return this.locationService.getAll();
  }

}
