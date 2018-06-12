import { Injectable } from '@angular/core';
import {Domotic} from "../../model/domotic";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DomoticService {

  domoticList: Domotic[] = [];
  constructor(private httpClient: HttpClient,) { }


  getAll(): Domotic[]{
    return this.domoticList;
  }

}
