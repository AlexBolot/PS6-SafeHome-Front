import {Component, DoCheck, IterableDiffers, OnInit} from '@angular/core';
import {Issue} from '../../model/issue';
import {IssueService} from '../../service/issue/issue.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {CategoryService} from '../../service/category/category.service';
import {Categorie} from '../../model/categorie';
import {StatusService} from '../../service/status/status.service';
import {LocationService} from '../../service/location/location.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],

})
export class IssueListComponent implements OnInit, DoCheck {

  issues: Issue[] = [];
  fullIssues: Issue[] = [];

  buttonBaseStyle: String = 'btn btn-block btn-';
  declaredButtonStyle = this.buttonBaseStyle + 'primary';
  assignedButtonStyle = this.buttonBaseStyle + 'info';
  declaredButtonIsChecked = false;
  assignedButtonIsChecked = false;

  progressBaseStyle: String = 'progress-bar progress-bar-';

  todoWidth;
  doingWidth;
  doneWidth;

  todoProgressStyle: String = this.progressBaseStyle + 'danger';
  doingProgressStyle: String = this.progressBaseStyle + 'warning';
  doneProgressStyle: String = this.progressBaseStyle + 'success';

  sortBy: string;
  inputSearch: string;

  opacityProgress = 1;

  differ: any;

  constructor(private issueService: IssueService, private authService: AuthenticationService, private statusService: StatusService,
              private locationService: LocationService, private categoryService: CategoryService, private differs: IterableDiffers) {
    this.differ = this.differs.find([]).create(null);
  }

  ngOnInit() {
    this.authService.isLogged().subscribe((logged) => {
      if (logged) {
        console.log('I am logged');
        this.declaredButton_OnClick();
      }
      console.log('I am not logged yet');
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

  declaredButton_OnClickOneTime() {
    if (!this.declaredButtonIsChecked) {
      this.declaredButton_OnClick();
      this.sortBy = 'date';
      this.declaredButtonIsChecked = true;
    }
  }

  assignedButton_OnClickOneTime() {
    if (!this.assignedButtonIsChecked) {
      this.assignedButton_OnClick();
      this.sortBy = 'importance';
      this.assignedButtonIsChecked = true;
    }
  }

  declaredButton_OnClick() {
    this.issueService.getDeclared(this.authService.getUser().idUser).subscribe(value => {
      this.issues = this.issueService.getSortedByDate(value);
      this.fullIssues = this.issues;
    });
    this.declaredButtonStyle = this.buttonBaseStyle + 'primary';
    this.assignedButtonStyle = this.buttonBaseStyle + 'info';
    this.assignedButtonIsChecked = false;
  }

  assignedButton_OnClick() {
    this.issueService.getAssignee(this.authService.getUser().idUser).subscribe(value => {
      this.issues = this.issueService.getSortedByImportance(value);
      this.fullIssues = this.issues;
    });
    this.assignedButtonStyle = this.buttonBaseStyle + 'primary';
    this.declaredButtonStyle = this.buttonBaseStyle + 'info';
    this.declaredButtonIsChecked = false;
  }

  updatePercents(issues: Issue[]) {
    const total = issues.length;

    if (total === 0) {
      this.todoWidth = 0;
      this.doingWidth = 0;
      this.doneWidth = 0;
    } else {
      this.todoWidth = this.issueService.getCountByState(issues, Issue.TodoID) * 100 / total;
      this.doingWidth = this.issueService.getCountByState(issues, Issue.DoingID) * 100 / total;
      this.doneWidth = this.issueService.getCountByState(issues, Issue.DoneID) * 100 / total;
    }
  }

  callType() {
    if (this.inputSearch === undefined || this.inputSearch === '') {
      if (this.assignedButtonIsChecked) {
        if (this.sortBy === 'importance') {
          this.issues = this.issueService.getSortedByImportance(this.issues);
        } else if (this.sortBy === 'date') {
          this.issues = this.issueService.getSortedByDate(this.issues);
        }
      } else if (this.declaredButtonIsChecked) {
        if (this.sortBy === 'importance') {
          this.issues = this.issueService.getSortedByImportance(this.issues);
        } else if (this.sortBy === 'date') {
          this.issues = this.issueService.getSortedByDate(this.issues);
        }
      }
    } else if (this.inputSearch !== '') {
      if (this.assignedButtonIsChecked) {
        if (this.sortBy === 'importance') {
          this.issues = this.issueService.getSortedByImportance(this.issueService.getFilter(this.fullIssues, this.inputSearch));
        } else if (this.sortBy === 'date') {
          this.issues = this.issueService.getSortedByDate(this.issueService.getFilter(this.fullIssues, this.inputSearch));
        }
      } else if (this.declaredButtonIsChecked) {
        if (this.sortBy === 'importance') {
          this.issues = this.issueService.getSortedByImportance(this.issueService.getFilter(this.fullIssues, this.inputSearch));
        } else if (this.sortBy === 'date') {
          this.issues = this.issueService.getSortedByDate(this.issueService.getFilter(this.fullIssues, this.inputSearch));
        }
      }
    }
  }

  fullIssuesUpdate(update: boolean) {
    if (this.assignedButtonIsChecked) {
      this.issueService.getAssignee(this.authService.getUser().idUser).subscribe(value => {
        this.fullIssues = value;
        this.changeProgressOpacity(0.5);
      });
    } else if (this.declaredButtonIsChecked) {
      this.issueService.getDeclared(this.authService.getUser().idUser).subscribe(value => {
        this.fullIssues = value;
        this.changeProgressOpacity(0.5);
      });
    }
  }

  changeProgressOpacity(amount: number) {
    this.opacityProgress = amount;
  }
}
