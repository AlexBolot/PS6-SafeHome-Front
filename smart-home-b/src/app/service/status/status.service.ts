import {Injectable} from '@angular/core';

@Injectable()
export class StatusService {

  map = new Map([
    [1, 'A faire'],
    [2, 'En cours'],
    [3, 'Fait'],
    [4, 'Abandonné']
  ]);

  constructor() {
  }

  getLabel(id: number): String {
    return this.map.get(id);
  }
}
