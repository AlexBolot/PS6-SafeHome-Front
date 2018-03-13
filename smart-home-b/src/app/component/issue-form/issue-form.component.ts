import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }
}
