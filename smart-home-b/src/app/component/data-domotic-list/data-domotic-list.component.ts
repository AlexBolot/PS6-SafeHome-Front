import {Component, Input, OnChanges} from '@angular/core';
import {Schedule} from '../../model/schedule';
import {DomoticService} from '../../service/domotic/domotic.service';

@Component({
  selector: 'app-data-domotic-list',
  templateUrl: './data-domotic-list.component.html',
  styleUrls: ['./data-domotic-list.component.css']
})
export class DataDomoticListComponent implements OnChanges {
  showData = true;
  @Input() showTemperature;
  @Input() domoticItemID;
  schedules: Schedule[];

  addScheduleIcon: String = 'glyphicon glyphicon-menu-down';
  listSchedulesIcon: String = 'glyphicon glyphicon-menu-down';
  visibleAddSchedule = true;
  visibleListSchedules = true;

  constructor(private domoticService: DomoticService) {
  }

  ngOnChanges() {
    this.domoticService.getSchedules(this.domoticItemID).subscribe(value => {
      this.schedules = value;
    });

    console.log(this.domoticItemID);
  }

  showAddSchedule() {
    this.visibleAddSchedule = !this.visibleAddSchedule;
    this.addScheduleIcon = this.visibleAddSchedule ? 'glyphicon glyphicon-menu-up' : 'glyphicon glyphicon-menu-down';
  }

  showListSchedules() {
    this.visibleListSchedules = !this.visibleListSchedules;
    this.listSchedulesIcon = this.visibleListSchedules ? 'glyphicon glyphicon-menu-up' : 'glyphicon glyphicon-menu-down';
  }
}
