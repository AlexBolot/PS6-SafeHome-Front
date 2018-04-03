import { Injectable } from '@angular/core';
import {CategoryService} from '../category/category.service';
import {UrgencyService} from '../urgency/urgency.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GuardCategoryResolve implements Resolve<any> {

  constructor(private categoryService: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('resolve Category activated');
  return this.categoryService.getAll();
  }

}
