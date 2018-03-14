import {Injectable} from '@angular/core';
import {Issue} from '../../model/issue';

@Injectable()
export class IssueService {

  issues: Issue[] = [
    new Issue(1, 'Cours long', 'Le cours de ProgSystème est long et on s\'ennuie... Ça fini quand ?',
      new Date(), new Date(), 2, 4, 1, 1, 2, '', 1),
    new Issue(2, 'DS de SSII', 'C\'est un vrai problème ! Il va falloir bien réviser pour pas avoir 0',
      new Date(), new Date(), 5, 4, 5, 1, 2, '', 3),
    new Issue(4, 'QCM de QGL', 'On sait pas à quoi s\'attendre... Ça fait une peu peur quand même',
      new Date(), new Date(), 3, 5, 21, 4, 1, '', 3),
    new Issue(5, 'Incident n°5', 'Description blabla', new Date(), new Date(), 4, 6, 12, 4, 3, '', 1),
    new Issue(8, 'Incident n°8', 'Description blabla', new Date(), new Date(), 1, 5, 4, 4, 25, '', 2),
  ];

  constructor() {
  }

  getIssues(): Issue[] {
    return this.issues;
  }

}
