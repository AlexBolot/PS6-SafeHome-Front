import {Component, OnInit, Input} from '@angular/core';
import {Issue} from '../../model/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  bool = false;

  @Input() issue: Issue;

  constructor() {
  }

  ngOnInit() {
  }

  showMore() {
    this.bool = !this.bool;
  }

}
