import {Component, OnInit, Input} from '@angular/core';
import {Issue} from '../../model/issue';
import {CategoryService} from '../../service/category/category.service';
import {StatusService} from '../../service/status/status.service';
import {UrgencyService} from '../../service/urgency/urgency.service';
import {TaskService} from '../../service/task/task.service';
import {Task} from '../../model/task';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  tasks: Task[] = [];
  title: String;
  /*tasks: Task[] = [
    new Task('Ceci est une tâche', 1, 1, 1, 2),
    new Task('Et ça une autre tâche', 1, 1, 2, 3),
    new Task('Et en voilà une petite troisième pour la route !', 1, 1, 2, 1),
  ];*/

  visibleTasks = false;
  visibleDetails = false;
  categoryLabel: String;
  statusLabel: String;
  urgencyLabel: String;

  @Input() issue: Issue;

  constructor(private categoryService: CategoryService,
              private urgencyService: UrgencyService,
              private statusService: StatusService,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.categoryService.getByID(this.issue.categoryId).subscribe(value => this.categoryLabel = value);
    this.urgencyService.getByID(this.issue.IDUrgency).subscribe(value => this.urgencyLabel = value);
    this.statusService.getByID(this.issue.IDStatus).subscribe(value => this.statusLabel = value);
    this.taskService.getAllByIssueID(this.issue.id).subscribe(value => this.tasks = value);
  }

  showMore() {
    this.visibleDetails = !this.visibleDetails;
  }

  showTasks() {
    this.visibleTasks = !this.visibleTasks;
  }

  changeBackground(): string {
    if (this.urgencyLabel === 'Mineur') {
      return 'blue';
    } else {
      if (this.urgencyLabel === 'Faible') {
        return 'green';
      } else if (this.urgencyLabel === 'Moyenne') {
        return 'orange';
      } else if (this.urgencyLabel === 'Forte') {
        return 'red';
      } else if (this.urgencyLabel === 'Majeure') {
        return 'grey';
      }
    }
  }
}
