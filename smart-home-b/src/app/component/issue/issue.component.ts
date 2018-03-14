import {Component, OnInit, Input} from '@angular/core';
import {Issue} from '../../model/issue';
import {CategoryService} from '../../service/category/category.service';
import {StatusService} from '../../service/status/status.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  visibleDetails = false;
  categoryLabel: String;
  statusLabel: String;

  @Input() issue: Issue;

  constructor(private categoryService: CategoryService, private statusService: StatusService) {
  }

  ngOnInit() {
    this.categoryService.getByID(this.issue.idCat).subscribe(value => this.categoryLabel = value);
    this.statusLabel = this.statusService.getLabel(this.issue.idStatus);
  }

  showMore() {
    this.visibleDetails = !this.visibleDetails;
  }

}
