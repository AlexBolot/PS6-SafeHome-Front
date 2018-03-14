import {Injectable} from '@angular/core';

@Injectable()
export class UrgencyService {

  map = new Map([
    [1, 'Mineur'],
    [2, 'Faible'],
    [3, 'Moyenne'],
    [4, 'Grande'],
    [5, 'Majeur']
  ]);

  constructor() {
  }

  getLabel(id: number): String {
    return this.map.get(id);
  }
}
