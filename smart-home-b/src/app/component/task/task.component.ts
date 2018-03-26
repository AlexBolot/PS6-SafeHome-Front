import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../model/task';
import {TaskService} from '../../service/task/task.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  constructor(private taskService: TaskService, private authService: AuthenticationService) {
  }

  ngOnInit() {
  }
}
