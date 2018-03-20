import {Component, OnInit, Input} from '@angular/core';
import {Issue} from '../../model/issue';
import {CategoryService} from '../../service/category/category.service';
import {StatusService} from '../../service/status/status.service';
import {UrgencyService} from '../../service/urgency/urgency.service';
import {TaskService} from '../../service/task/task.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  visibleDetails = false;
  categoryLabel: String;
  statusLabel: String;
  urgencyLabel: String;

  @Input() issue: Issue;

  constructor(private categoryService: CategoryService,
              private statusService: StatusService,
              private urgencyService: UrgencyService,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.categoryService.getByID(this.issue.categoryId).subscribe(value => this.categoryLabel = value);
    this.urgencyService.getByID(this.issue.IDUrgency).subscribe(value => this.urgencyLabel = value);

    this.taskService.getAll().subscribe(value => console.log(value));

    this.statusService.getByID(this.issue.IDStatus).subscribe(value => this.statusLabel = value);
  }

  showMore() {
    this.visibleDetails = !this.visibleDetails;
  }

}
