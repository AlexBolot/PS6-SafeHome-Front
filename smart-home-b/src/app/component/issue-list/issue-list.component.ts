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
  baseStyle: String = 'btn btn-block btn-';
  declaredButtonStyle = this.baseStyle + 'primary';
  assignedButtonStyle = this.baseStyle + 'info';
  declaredButtonIsChecked = false;
  assignedButtonIsChecked = false;

  constructor(private issueService: IssueService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.isLogged().subscribe((logged) => {
      if (logged) {
        this.issueService.getDeclaredBy(this.authService.getUser().idUser).subscribe(value => this.issues = value);
      }
    });
  }

  declaredButton_OnClickOneTime() {
    if (!this.declaredButtonIsChecked) {
      this.declaredButton_OnClick();
      this.declaredButtonIsChecked = true;
    }
  }

  declaredButton_OnClick() {
    this.issueService.getDeclaredBy(this.authService.getUser().idUser).subscribe(value => this.issues = value);
    this.declaredButtonStyle = this.baseStyle + 'primary';
    this.assignedButtonStyle = this.baseStyle + 'info';
    this.assignedButtonIsChecked = false;
  }
  assignedButton_OnClickOneTime() {
    if (!this.assignedButtonIsChecked ) {
      this.assignedButton_OnClick();
      this.assignedButtonIsChecked = true;
    }
  }

  assignedButton_OnClick() {
    this.issueService.getAssignedTo(this.authService.getUser().idUser).subscribe(value => this.issues = value);
    this.assignedButtonStyle = this.baseStyle + 'primary';
    this.declaredButtonStyle = this.baseStyle + 'info';
    this.declaredButtonIsChecked = false;
  }
}
