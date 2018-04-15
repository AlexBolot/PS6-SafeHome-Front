import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../model/task';
import {TaskService} from '../../service/task/task.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User} from "../../model/user";
import {log} from "util";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  author: String;
  asignee: String;

  constructor(private taskService: TaskService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.taskService.getAuthorById(this.task.id).subscribe(value => this.author = value.username);
    this.taskService.getAsigneeById(this.task.id).subscribe(value => this.asignee = value.username);

  }

  clickToUncheck() {
    if(this.authService.getUser().idUser==this.task.IDAssignee) {
      this.task.done = false;
      this.taskService.setTaskToUndone(this.task).subscribe(value => log('changed'));
    }
    else{
      console.log('you are not authorized')
    }
  }

  clickToCheck() {
    if(this.authService.getUser().idUser==this.task.IDAssignee) {
      this.task.done = true;
      this.taskService.setTaskToDone(this.task).subscribe(value => log('changed'));
    }
    else{
      console.log('you are not authorized');
    }
  }
}
