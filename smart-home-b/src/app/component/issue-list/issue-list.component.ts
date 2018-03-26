import {Component, OnInit} from '@angular/core';
import {Issue} from '../../model/issue';
import {IssueService} from '../../service/issue/issue.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];
  declaredButtonColor = 'not-selected';
  assignedButtonColor = 'not-selected';

  constructor(private issueService: IssueService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.issueService.getDeclaredBy(this.authService.getUser().idUser).subscribe(value => this.issues = value);
    this.declaredButtonColor = 'selected';
  }

  declaredButton_OnClick() {
    this.issueService.getDeclaredBy(this.authService.getUser().idUser).subscribe(value => this.issues = value);
    this.declaredButtonColor = 'selected';
    this.assignedButtonColor = 'not-selected';
  }

  assignedButton_OnClick() {
    this.issueService.getAssignedTo(this.authService.getUser().idUser).subscribe(value => this.issues = value);
    this.assignedButtonColor = 'selected';
    this.declaredButtonColor = 'not-selected';
  }
}
