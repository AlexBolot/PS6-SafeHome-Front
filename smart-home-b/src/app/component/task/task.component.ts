///<reference path="../../../../node_modules/@types/node/index.d.ts"/>
import {Component, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../model/task';
import {TaskService} from '../../service/task/task.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {IssueService} from '../../service/issue/issue.service';
import {log} from 'util';
import {Issue} from '../../model/issue';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() updateStatus = new EventEmitter<boolean>();
  author: String;
  asignee: String;
  issue: Issue;
  taskList: Task[] = [];
  numberOfTask: number;
  taskIsDone: boolean;
  btnIcon: String = 'glyphicon glyphicon-ok';
  btnColor: String = 'btn btn-success';
  userAllowed = true;

  constructor(private taskService: TaskService, private authService: AuthenticationService,
              private issueService: IssueService) {
  }

  ngOnInit() {
    this.taskService.getAuthorById(this.task.id).subscribe(value => this.author = value.username);
    this.taskService.getAsigneeById(this.task.id).subscribe(value => this.asignee = value.username);
    this.taskIsDone = this.task.done;
    this.btnIcon = this.taskIsDone ? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-ok';
    this.btnColor = this.taskIsDone ? 'btn btn-danger' : 'btn btn-success';
    if (this.authService.getUser().idUser !== this.task.IDAssignee) {
      this.userAllowed = false;
      this.btnColor = 'btn btn-default';
    }
  }

  changeTaskStatus() {
    this.taskIsDone = !this.taskIsDone;
    this.btnIcon = this.taskIsDone ? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-ok';
    if (this.userAllowed) {
      this.btnColor = this.taskIsDone ? 'btn btn-danger' : 'btn btn-success';
    }

    if (this.authService.getUser().idUser === this.task.IDAssignee) {
      this.task.done = this.taskIsDone;
      this.taskService.setTaskToUndone(this.task).subscribe(() => this.updateStatusIssue());
    } else {
      console.log('you are not authorized');
    }
  }

  private updateStatusIssue() {
    this.taskService.getAllByIssueID(this.task.IDIssue).subscribe(value => {
      this.taskList = value;

      this.issueService.getByID(this.task.IDIssue).subscribe(value => {
        this.issue = value;
        this.taskService.getNbByIdIssue(this.task.IDIssue).subscribe(value => {
            this.numberOfTask = value;
            let numberOfTaskDone = 0;
            for (const taskk of this.taskList) {
              if (taskk.done) {
                numberOfTaskDone++;
              }
            }
            if (numberOfTaskDone > 0) {
              if (this.numberOfTask['count'] == numberOfTaskDone) {
                this.issue.IDStatus = 1;
              } else {
                this.issue.IDStatus = 3;
              }
            } else if (numberOfTaskDone == 0) {
              this.issue.IDStatus = 2;
            }
            this.issueService.put(this.issue).subscribe(
              value => {
                log('updated');
                this.updateStatus.emit(true);
                console.log('jesuisaussipasséparlà');
              });
          }
        );
      });
    });
  }

}
