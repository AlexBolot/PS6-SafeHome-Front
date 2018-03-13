import {Component, OnInit} from '@angular/core';
import {Issue} from '../../model/issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  bob: Issue[] = [
    new Issue(5),
    new Issue(7),
    new Issue(1),
    new Issue(24),
    new Issue(51)
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
