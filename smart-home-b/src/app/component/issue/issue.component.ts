import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Issue} from '../../model/issue';
import {CategoryService} from '../../service/category/category.service';
import {StatusService} from '../../service/status/status.service';
import {UrgencyService} from '../../service/urgency/urgency.service';
import {TaskService} from '../../service/task/task.service';
import {Task} from '../../model/task';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User} from '../../model/user';
import {LocationService} from '../../service/location/location.service';
import {IssueService} from '../../service/issue/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  buttonDetailsIcon = 'glyphicon glyphicon-menu-down';
  buttonTasksIcon = 'glyphicon glyphicon-menu-down';

  tasks: Task[] = [];
  visibleTasks = false;
  visibleDetails = false;
  urgencyLabel: string;
  locationLabel: string;
  statusLabel: string;
  categoryLabel: string;

  @Input() issue: Issue;
  @Output() fullIssuesUpdate = new EventEmitter<void>();

  constructor(private categoryService: CategoryService,
              private urgencyService: UrgencyService,
              private statusService: StatusService,
              private locationService: LocationService,
              private taskService: TaskService,
              private issueService: IssueService) {
  }

  ngOnInit() {
    this.issueService.getTasks(this.issue.id).subscribe(tasks => this.tasks = tasks);

    this.urgencyLabel = this.urgencyService.getByID(this.issue.IDUrgency);
    this.statusLabel = this.statusService.getByID(this.issue.IDStatus);
    this.categoryLabel = this.categoryService.getByID(this.issue.categoryId);
    this.locationLabel = this.locationService.getByID(this.issue.IDLocation);
  }

  showMore() {
    this.visibleDetails = !this.visibleDetails;
    this.buttonDetailsIcon = this.visibleDetails ? 'glyphicon glyphicon-menu-up' : 'glyphicon glyphicon-menu-down';
  }

  showTasks() {
    this.visibleTasks = !this.visibleTasks;
    this.buttonTasksIcon = this.visibleTasks ? 'glyphicon glyphicon-menu-up' : 'glyphicon glyphicon-menu-down';
  }

  changeStatusBackGround(): String {
    switch (this.issue.IDStatus) {
      case 1:
        return '#f2dede';
      case 2:
        return '#fcf8e3';
      case 3:
        return '#dff0d8';
      default:
        return '#f5f5f5';
    }
  }

  changeUrgencyBackground(): String {
    switch (this.urgencyLabel) {
      case 'Faible':
        return 'yellow';
      case 'Moyenne':
        return '#f0ad4e';
      case 'Forte':
        return '#d9534f';
      default:
        return 'bg-default';
    }
  }

  updateSelf(status: boolean) {
    this.issueService.getByID(this.issue.id).subscribe(value => {
      this.issue = value;
      this.ngOnInit();
      this.fullIssuesUpdate.emit();
    });
  }
}
