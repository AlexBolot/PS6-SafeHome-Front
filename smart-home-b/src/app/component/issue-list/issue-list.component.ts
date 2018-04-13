import {Component, OnInit} from '@angular/core';
import {Issue} from '../../model/issue';
import {IssueService} from '../../service/issue/issue.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],

})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];
  baseStyle: String = 'btn btn-block btn-';
  declaredButtonStyle = this.baseStyle + 'primary';
  assignedButtonStyle = this.baseStyle + 'info';
  declaredButtonIsChecked = false;
  assignedButtonIsChecked = false;
  sortBy: string;
  inputSearch: string;

  constructor(private issueService: IssueService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.isLogged().subscribe((logged) => {
      if (logged) {
        this.issueService.getDeclaredByDate(this.authService.getUser().idUser).subscribe(value => this.issues = value);
        this.sortBy = 'date';
        this.declaredButtonIsChecked = true;
      }
    });
  }

  declaredButton_OnClickOneTime() {
    if (!this.declaredButtonIsChecked) {
      this.declaredButton_OnClick();
      this.sortBy = 'date';
      this.declaredButtonIsChecked = true;
    }
  }

  declaredButton_OnClick() {
    this.issues = null;
    this.issueService.getDeclaredByDate(this.authService.getUser().idUser).subscribe(value => this.issues = value);
    this.declaredButtonStyle = this.baseStyle + 'primary';
    this.assignedButtonStyle = this.baseStyle + 'info';
    this.assignedButtonIsChecked = false;
  }

  assignedButton_OnClickOneTime() {
    if (!this.assignedButtonIsChecked) {
      this.assignedButton_OnClick();
      this.sortBy = 'importance';
      this.assignedButtonIsChecked = true;
    }
  }

  assignedButton_OnClick() {
    this.issues = null;
    this.issueService.getAssignedToByImportance(this.authService.getUser().idUser).subscribe(value => this.issues = value);
    this.assignedButtonStyle = this.baseStyle + 'primary';
    this.declaredButtonStyle = this.baseStyle + 'info';
    this.declaredButtonIsChecked = false;
  }

  callType() {
    if (this.inputSearch === undefined) {
      if (this.assignedButtonIsChecked) {
        if (this.sortBy === 'importance') {
          this.issueService.getAssignedToByImportance(this.authService.getUser().idUser).subscribe(value => this.issues = value);
        } else if (this.sortBy === 'date') {
          this.issueService.getAssignedToByDate(this.authService.getUser().idUser).subscribe(value => this.issues = value);
        }
      } else if (this.declaredButtonIsChecked) {
        if (this.sortBy === 'importance') {
          this.issueService.getDeclaredByImportance(this.authService.getUser().idUser).subscribe(value => this.issues = value);
        } else if (this.sortBy === 'date') {
          this.issueService.getDeclaredByDate(this.authService.getUser().idUser).subscribe(value => this.issues = value);
        }
      }
    } else if (this.inputSearch !== undefined) {
      console.log(this.inputSearch);
      if (this.assignedButtonIsChecked) {
        if (this.sortBy === 'importance') {
          this.issueService.getAssignedToByImportanceAndString(this.authService.getUser().idUser, this.inputSearch)
            .subscribe(value => this.issues = value);
        } else if (this.sortBy === 'date') {
          this.issueService.getAssignedToByDateAndString(this.authService.getUser().idUser, this.inputSearch)
            .subscribe(value => this.issues = value);
        }
      } else if (this.declaredButtonIsChecked) {
        if (this.sortBy === 'importance') {
          this.issueService.getDeclaredFilterStringAndImportance(this.authService.getUser().idUser, this.inputSearch)
            .subscribe(value => this.issues = value);
        } else if (this.sortBy === 'date') {
          this.issueService.getDeclaredFilterStringAndDate(this.authService.getUser().idUser, this.inputSearch)
            .subscribe(value => this.issues = value);
        }
      }
    }
  }
}
