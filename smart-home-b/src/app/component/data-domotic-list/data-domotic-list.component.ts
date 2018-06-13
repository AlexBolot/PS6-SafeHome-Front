import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Schedules} from "../../model/schedules";
import {SchedulesService} from "../../service/schedules/schedules.service";
import {DomoticService} from "../../service/domotic/domotic.service";

@Component({
  selector: 'app-data-domotic-list',
  templateUrl: './data-domotic-list.component.html',
  styleUrls: ['./data-domotic-list.component.css']
})
export class DataDomoticListComponent implements OnChanges {
  showData = true;
  @Input() displayingTemperature;
  @Input() idDomoticItem;
  schedulesList: Schedules[];

  constructor(private domoticService: DomoticService) {
  }

  ngOnChanges() {
    this.domoticService.getSchedulesByDomoticID(this.idDomoticItem).subscribe(value => {
      this.schedulesList = value;
    });
  }

  onClickEffect() {
    this.showData = this.showData == false;
  }

  updateList(status: boolean) {
      console.log("beforeUpdateList");
      this.domoticService.getSchedulesByDomoticID(this.idDomoticItem).subscribe(value => {
        this.schedulesList = value;
      });
  }
}
