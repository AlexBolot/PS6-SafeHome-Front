import {Component, OnInit} from '@angular/core';
import {Issue} from '../../model/issue';
import {IssueService} from '../../service/issue/issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];
  declaredButtonColor = 'not-selected';
  assignedButtonColor = 'not-selected';

  constructor(private issueService: IssueService) {
  }

  ngOnInit() {
    this.issueService.getAll().subscribe(value => this.issues = value);
  }

  declaredButton_OnClick() {
    this.declaredButtonColor = 'selected';
    this.assignedButtonColor = 'not-selected';
  }

  assignedButton_OnClick() {
    this.assignedButtonColor = 'selected';
    this.declaredButtonColor = 'not-selected';
  }
}
