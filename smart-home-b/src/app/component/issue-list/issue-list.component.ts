import {Component, OnInit} from '@angular/core';
import {Issue} from '../../model/issue';
import {IssueService} from '../../service/issue/issue.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {CategoryService} from "../../service/category/category.service";
import {Categorie} from "../../model/categorie";
import {StatusService} from "../../service/status/status.service";
import {LocationService} from "../../service/location/location.service";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],

})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];
  fullIssues: Issue[] = [];
  baseStyle: String = 'btn btn-block btn-';
  declaredButtonStyle = this.baseStyle + 'primary';
  assignedButtonStyle = this.baseStyle + 'info';
  declaredButtonIsChecked = false;
  assignedButtonIsChecked = false;
  sortBy: string;
  inputSearch: string;

  constructor(private issueService: IssueService, private authService: AuthenticationService,private statusService: StatusService,
              private locationService : LocationService, private categoryService: CategoryService) {
  }

  ngOnInit() {

    this.authService.isLogged().subscribe((logged) => {
      if (logged) {
        this.issueService.getDeclared(this.authService.getUser().idUser).subscribe(value => {
          this.issues = this.issueService.getSortedByDate(value);
          this.fullIssues = this.issues;
        });
        this.declaredButtonIsChecked = true;
        this.sortBy = 'date';
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
    this.issueService.getDeclared(this.authService.getUser().idUser).subscribe(value => {
      this.issues = this.issueService.getSortedByDate(value);
      this.fullIssues = this.issues;
    });
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
    this.issueService.getAssignee(this.authService.getUser().idUser).subscribe(value => {
      this.issues = this.issueService.getSortedByImportance(value);
      this.fullIssues = this.issues;
    });
    this.assignedButtonStyle = this.baseStyle + 'primary';
    this.declaredButtonStyle = this.baseStyle + 'info';
    this.declaredButtonIsChecked = false;
  }

  callType() {
    if (this.inputSearch === undefined || this.inputSearch ==="") {
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
    } else if (this.inputSearch !== "") {
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
}
