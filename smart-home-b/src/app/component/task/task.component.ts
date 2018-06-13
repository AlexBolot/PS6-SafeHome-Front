///<reference path="../../../../node_modules/@types/node/index.d.ts"/>
import {Component, Input, OnInit, Output} from '@angular/core';
import {TaskService} from '../../service/task/task.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {IssueService} from '../../service/issue/issue.service';
import {log} from 'util';
import {Issue} from '../../model/issue';
import {EventEmitter} from '@angular/core';
import {Task} from '../../model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() updateParent = new EventEmitter<boolean>();
  author: String;
  asignee: String;
  issue: Issue;
  taskList: Task[] = [];
  numberOfTask: number;
  taskIsDone: boolean;
  btnIcon: String = 'glyphicon glyphicon-ok';
  btnColor: String = 'btn btn-default';
  userAllowed = false;
  userID: number;
  toggleSwitch: boolean;
  bannerColor: String = 'container-fluid panel panel-default';
  toggleVisible = 'sneaky';

  constructor(private taskService: TaskService, private authService: AuthenticationService,
              private issueService: IssueService) {
  }

  ngOnInit() {
    this.userID = this.authService.getUser().idUser;
    this.taskService.getAuthorById(this.task.id).subscribe(value => this.author = value.username);
    this.taskService.getAsigneeById(this.task.id).subscribe(value => this.asignee = value.username);
    this.taskIsDone = this.task.done;
    this.toggleSwitch = this.taskIsDone;

    this.issueService.getByID(this.task.IDIssue).subscribe(value => {
      this.issue = value;

      if (this.authService.getUser().idUser === this.task.IDAssignee && this.issue.IDStatus !== Issue.ArchivedID) {
        this.userAllowed = true;
        this.btnColor = 'btn btn-success';
        this.toggleVisible = '';

        if (this.taskIsDone) {
          this.bannerColor = 'container-fluid panel panel-success';
        } else {
          this.bannerColor = 'container-fluid panel panel-danger';
        }
      }
    });
  }

  changeTaskStatus() {
    this.taskIsDone = !this.taskIsDone;
    this.btnIcon = this.taskIsDone ? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-ok';
    if (this.userAllowed) {
      this.btnColor = this.taskIsDone ? 'btn btn-danger' : 'btn btn-success';
    }

    if (this.authService.getUser().idUser === this.task.IDAssignee) {
      this.taskService.toggleStatus(this.task).subscribe(() => this.updateStatusIssue());
    } else {
      console.log('you are not authorized');
    }
  }

  private updateStatusIssue() {
    //this.updateParent.emit(true);

    this.taskService.getAllByIssueID(this.task.IDIssue).subscribe(value => {
      this.taskList = value;

      this.issueService.getByID(this.task.IDIssue).subscribe(value => {
        this.issue = value;
        this.taskService.getNbByIdIssue(this.task.IDIssue).subscribe(value => {
            this.numberOfTask = value;
            let numberOfTaskDone = 0;
            for (const task of this.taskList) {
              if (task.done) {
                numberOfTaskDone++;
              }
            }
            if (numberOfTaskDone > 0) {
              if (this.numberOfTask['count'] === numberOfTaskDone) {
                this.issue.IDStatus = 3;
                this.issue.DateDone = new Date();
              } else {
                this.issue.IDStatus = 2;
                this.issue.DateDone = null;
              }
            } else if (numberOfTaskDone === 0) {
              this.issue.IDStatus = 1;
              this.issue.DateDone = null;
            }
            this.issueService.put(this.issue).subscribe(value => {
              this.updateParent.emit(true);
            });
          }
        );
      });
    });
  }
}
