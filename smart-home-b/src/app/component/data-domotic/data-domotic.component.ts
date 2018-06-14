import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Schedule} from '../../model/schedule';
import {ScheduleService} from '../../service/schedules/schedule.service';
import {Domotic} from '../../model/domotic';
import {DomoticTemperatureService} from '../../service/domoticTemperature/domotic-temperature.service';
import {DomoticTemperature} from '../../model/domotic-Temperature';
import {ScheduleValidatorService} from '../../service/schedule-validator/schedule-validator.service';

@Component({
  selector: 'app-data-domotic',
  templateUrl: './data-domotic.component.html',
  styleUrls: ['./data-domotic.component.css']
})
export class DataDomoticComponent implements OnInit {
  dayOfWeek: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  temperature: DomoticTemperature;

  @Input() currentSchedule: Schedule;
  @Input() showTemperature;
  @Input() domoticItemID;

  minHours = 0;
  maxHours = 23;
  minMinutes = 0;
  maxMinutes = 59;
  minTemperature = 20;

  startHour = 12;
  endHour = 13;
  startMinutes = 30;
  endMinutes = 30;

  dayUserChose: string;
  startDate: Date;
  endDate: Date;

  @Output() public updateList = new EventEmitter<void>();
  automaticToggle = false;

  constructor(private scheduleService: ScheduleService,
              private domoticTemperatureService: DomoticTemperatureService,
              private scheduleValidatorService: ScheduleValidatorService) {
  }

  ngOnInit() {

    if (this.currentSchedule) {
      if (this.domoticItemID === Domotic.thermostatId) {
        this.domoticTemperatureService.getByScheduleID(this.currentSchedule.id).subscribe(temperatures => {
          this.temperature = temperatures[0];
          this.showTemperature = true;
          console.log(temperatures[0]);
          this.minTemperature = temperatures[0].value;
        });
      }
      this.automaticToggle = this.currentSchedule.auto;
      this.startDate = new Date(this.currentSchedule.start);
      this.endDate = new Date(this.currentSchedule.end);
      this.startHour = this.startDate.getHours();
      this.startMinutes = this.startDate.getMinutes();
      this.endMinutes = this.endDate.getMinutes();
      this.endHour = this.endDate.getHours();

      const dayID = this.startDate.getUTCDay();

      this.dayUserChose = (dayID === 0) ? this.dayOfWeek[this.dayOfWeek.length - 1] : this.dayOfWeek[dayID - 1];
    }
    if (!this.dayUserChose) {
      this.dayUserChose = 'Lundi';
    }
  }

  checkStartHour() {
    if (this.minHours > this.startHour) {
      this.startHour = this.minHours;
    } else if (this.startHour > this.maxHours) {
      this.startHour = this.maxHours;
    }
  }

  checkStartMinutes() {
    if (this.minMinutes > this.startMinutes) {
      this.startMinutes = this.minMinutes;
    } else if (this.startMinutes > this.maxMinutes) {
      this.startMinutes = this.maxMinutes;
    }
  }

  checkEndHour() {
    if (this.minHours > this.endHour) {
      this.endHour = this.minHours;
    } else if (this.endHour > this.maxHours) {
      this.endHour = this.maxHours;
    }
  }

  checkEndMinutes() {
    if (this.minMinutes > this.endMinutes) {
      this.endMinutes = this.minMinutes;
    } else if (this.endMinutes > this.maxMinutes) {
      this.endMinutes = this.maxMinutes;
    }
  }

  addSchedule() {

    this.chooseDay();
    const schedule = new Schedule(undefined, this.startDate, this.endDate, this.domoticItemID, this.automaticToggle);

    this.scheduleValidatorService.isScheduleValid(schedule, this.domoticItemID).subscribe(answer => {
      if (answer) {
        this.scheduleService.add(schedule).subscribe(value => {
          if (this.domoticItemID === Domotic.thermostatId) {
            this.temperature = new DomoticTemperature(undefined, this.minTemperature, value['id']);
            this.domoticTemperatureService.add(this.temperature).subscribe();
          }
          this.updateList.emit();
          console.log('added schedule');
        });
      } else if (answer === null) {
        console.log('no reply yet');
      } else {
        console.log('update refused');
      }
    });
  }

  updateSchedule() {
    this.chooseDay();
    const schedule = new Schedule(this.currentSchedule.id, this.startDate, this.endDate, this.domoticItemID, this.automaticToggle);

    this.scheduleValidatorService.isScheduleValid(schedule, this.domoticItemID).subscribe(answer => {
      if (answer) {
        this.scheduleService.put(schedule).subscribe(value => {
          if (this.domoticItemID === Domotic.thermostatId) {
            this.temperature = new DomoticTemperature(this.temperature.id, this.minTemperature, value['id']);
            this.domoticTemperatureService.put(this.temperature).subscribe(() => console.log('valueTempUpdated'));
          }
          console.log('updated schedule');
          this.updateList.emit();
        });
      } else if (answer === null) {
        console.log('no reply yet');
      } else {
        console.log('update refused');
      }
    });
  }

  chooseDay() {

    let dateValue;

    switch (this.dayUserChose) {
      case 'Lundi':
        dateValue = '06/11/2018, ';
        break;
      case 'Mardi':
        dateValue = '06/12/2018, ';
        break;
      case 'Mercredi':
        dateValue = '06/13/2018, ';
        break;
      case 'Jeudi':
        dateValue = '06/14/2018, ';
        break;
      case 'Vendredi':
        dateValue = '06/15/2018, ';
        break;
      case 'Samedi':
        dateValue = '06/16/2018, ';
        break;
      case 'Dimanche':
        dateValue = '06/17/2018, ';
        break;
    }

    this.startDate = new Date(dateValue + this.startHour.toString() + ':' + this.startMinutes.toString());
    this.endDate = new Date(dateValue + this.endHour.toString() + ':' + this.endMinutes.toString());
  }

  deleteSchedule() {
    this.scheduleService.delete(this.currentSchedule.id).subscribe(value => {
      console.log("deleted");
      this.updateList.emit();
    });
  }
}
