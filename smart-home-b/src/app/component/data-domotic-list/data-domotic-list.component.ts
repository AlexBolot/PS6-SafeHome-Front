import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-data-domotic-list',
  templateUrl: './data-domotic-list.component.html',
  styleUrls: ['./data-domotic-list.component.css']
})
export class DataDomoticListComponent implements OnInit {
  showData = true;
  @Input() displayingTemperature;
  constructor() { }

  ngOnInit() {

  }
  onClickEffect() {
    this.showData = this.showData == false;
  }

}
