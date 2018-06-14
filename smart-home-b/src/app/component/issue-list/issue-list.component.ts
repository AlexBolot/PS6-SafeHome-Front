import {Component, DoCheck, IterableDiffer, IterableDiffers, OnInit} from '@angular/core';
import {Issue} from '../../model/issue';
import {IssueService} from '../../service/issue/issue.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {CategoryService} from '../../service/category/category.service';
import {StatusService} from '../../service/status/status.service';
import {LocationService} from '../../service/location/location.service';
import {UrgencyService} from '../../service/urgency/urgency.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],

})
export class IssueListComponent implements OnInit, DoCheck {

  issues: Issue[] = [];
  fullIssues: Issue[] = [];

  loadingAttempt = 0;

  buttonBaseStyle = 'btn btn-block btn-';
  declaredButtonStyle = this.buttonBaseStyle + 'primary';
  assignedButtonStyle = this.buttonBaseStyle + 'info';
  showingDeclaredIssues = false;
  showingAssignedIssues = false;

  progressBaseStyle = 'progress-bar progress-bar-';

  todoWidth;
  doingWidth;
  doneWidth;

  todoProgressStyle: string = this.progressBaseStyle + 'danger';
  doingProgressStyle: string = this.progressBaseStyle + 'warning';
  doneProgressStyle: string = this.progressBaseStyle + 'success';

  sortBy: string;
  inputSearch: string;

  opacityProgress = 1;

  differ: any;
  showArchives = false;

  constructor(private issueService: IssueService, private authService: AuthenticationService, private statusService: StatusService,
              private locationService: LocationService, private categoryService: CategoryService, private differs: IterableDiffers,
              private urgencyService: UrgencyService) {
    this.differ = this.differs.find([]).create(null);
  }

  ngOnInit() {
    this.authService.isLogged().subscribe((logged) => {
      if (logged) {
        console.log('I am logged');
        this.declaredButton_OnClick();
      } else {
        console.log('I am not logged yet');

        if (this.loadingAttempt < 5) {
          setTimeout(() => this.ngOnInit(), 200);
          this.loadingAttempt++;
        }
      }
    });
  }

  ngDoCheck() {
    const issueChange = this.differ.diff(this.issues);
    if (issueChange !== null) {
      console.log('Updating');
      this.updatePercents(this.issues);
      this.changeProgressOpacity(1);
    }
  }

  refreshCache() {
    this.locationService.refreshCache();
    this.categoryService.refreshCache();
    this.statusService.refreshCache();
    this.urgencyService.refreshCache();
  }

  declaredButton_OnClickOneTime() {
    if (!this.showingDeclaredIssues) {
      this.refreshCache();
      this.declaredButton_OnClick();
      this.sortBy = 'date';
      this.showingDeclaredIssues = true;
    }
  }

  assignedButton_OnClickOneTime() {
    if (!this.showingAssignedIssues) {
      this.refreshCache();
      this.assignedButton_OnClick();
      this.sortBy = 'importance';
      this.showingAssignedIssues = true;
    }
  }

  declaredButton_OnClick() {
    this.issueService.getDeclared(this.authService.getUser().idUser, this.showArchives).subscribe(value => {
      this.issues = this.issueService.getSortedByDate(value);
      this.fullIssues = this.issues;
    });
    this.declaredButtonStyle = this.buttonBaseStyle + 'primary';
    this.assignedButtonStyle = this.buttonBaseStyle + 'info';
    this.showingAssignedIssues = false;
  }

  assignedButton_OnClick() {
    this.issueService.getAssignee(this.authService.getUser().idUser, this.showArchives).subscribe(value => {
      this.issues = this.issueService.getSortedByImportance(value);
      this.fullIssues = this.issues;
    });
    this.assignedButtonStyle = this.buttonBaseStyle + 'primary';
    this.declaredButtonStyle = this.buttonBaseStyle + 'info';
    this.showingDeclaredIssues = false;
  }

  showArchives_OnClick() {
    this.showArchives = !this.showArchives;

    if (this.showingAssignedIssues) {
      this.assignedButton_OnClick();
    } else {
      this.declaredButton_OnClick();
    }
  }

  updatePercents(issues: Issue[]) {

    let totalUnarchived = 0;
    for (const issue of issues) {
      if (issue.IDStatus !== Issue.ArchivedID) {
        totalUnarchived++;
      }
    }

    if (totalUnarchived === 0) {
      this.todoWidth = 0;
      this.doingWidth = 0;
      this.doneWidth = 0;
    } else {
      this.todoWidth = this.issueService.getCountByState(issues, Issue.TodoID) * 100 / totalUnarchived;
      this.doingWidth = this.issueService.getCountByState(issues, Issue.DoingID) * 100 / totalUnarchived;
      this.doneWidth = this.issueService.getCountByState(issues, Issue.DoneID) * 100 / totalUnarchived;
    }
  }

  callType() {
    if (this.inputSearch === undefined || this.inputSearch === '') {
      if (this.showingAssignedIssues) {
        if (this.sortBy === 'importance') {
          this.issues = this.issueService.getSortedByImportance(this.issues);
        } else if (this.sortBy === 'date') {
          this.issues = this.issueService.getSortedByDate(this.issues);
        }
      } else if (this.showingDeclaredIssues) {
        if (this.sortBy === 'importance') {
          this.issues = this.issueService.getSortedByImportance(this.issues);
        } else if (this.sortBy === 'date') {
          this.issues = this.issueService.getSortedByDate(this.issues);
        }
      }
    } else if (this.inputSearch !== '') {
      if (this.showingAssignedIssues) {
        if (this.sortBy === 'importance') {
          this.issues = this.issueService.getSortedByImportance(this.issueService.getFilter(this.fullIssues, this.inputSearch));
        } else if (this.sortBy === 'date') {
          this.issues = this.issueService.getSortedByDate(this.issueService.getFilter(this.fullIssues, this.inputSearch));
        }
      } else if (this.showingDeclaredIssues) {
        if (this.sortBy === 'importance') {
          this.issues = this.issueService.getSortedByImportance(this.issueService.getFilter(this.fullIssues, this.inputSearch));
        } else if (this.sortBy === 'date') {
          this.issues = this.issueService.getSortedByDate(this.issueService.getFilter(this.fullIssues, this.inputSearch));
        }
      }
    }
  }

  fullIssuesUpdate() {
    if (this.showingAssignedIssues) {
      this.issueService.getAssignee(this.authService.getUser().idUser, this.showArchives).subscribe(value => {
        console.log('bob = ' + value);
        this.fullIssues = value;
        this.changeProgressOpacity(0.5);
      });
    } else if (this.showingDeclaredIssues) {
      this.issueService.getDeclared(this.authService.getUser().idUser, this.showArchives).subscribe(value => {
        this.fullIssues = value;
        this.changeProgressOpacity(0.5);
      });
    }
  }

  changeProgressOpacity(amount: number) {
    this.opacityProgress = amount;
  }
}
