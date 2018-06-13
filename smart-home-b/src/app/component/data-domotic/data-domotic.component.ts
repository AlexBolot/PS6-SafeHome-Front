import {Component, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {EventEmitter} from '@angular/core';
import {Schedules} from "../../model/schedules";
import {SchedulesService} from "../../service/schedules/schedules.service";
import {Domotic} from "../../model/domotic";
import {DomoticTemperatureService} from "../../service/domoticTemperature/domotic-temperature.service";
import {DomoticTemperature} from "../../model/domotic-Temperature";

@Component({
  selector: 'app-data-domotic',
  templateUrl: './data-domotic.component.html',
  styleUrls: ['./data-domotic.component.css']
})
export class DataDomoticComponent implements OnInit {
  dayOfWeek: string[] = [];
  futureSchedule: Schedules;
  @Input() currentSchedule: Schedules;
  @Input() displayingTemperature;
  @Input() idDomoticItem;
  minValueHours = 0;
  maxValueHours = 23;
  minValueMinute = 0;
  domoticTemperature: DomoticTemperature;
  maxValueMinute = 59;
  currentValueHours1 = 12;
  currentValueHours2 = 13;
  currentValueMinute1 = 30;
  currentValueMinute2 = 30;
  currentTemperatureMin = 20;
  dayUserChose: string;
  @Output() public updateList = new EventEmitter<boolean>();
  startDate: Date;
  endDate: Date;
  pipe;

  constructor(private scheduleService: SchedulesService,
              private domoticTemperatudeService: DomoticTemperatureService) {
  }

  ngOnInit() {
    this.dayOfWeek.push("Lundi");
    this.dayOfWeek.push("Mardi");
    this.dayOfWeek.push("Mercredi");
    this.dayOfWeek.push("Jeudi");
    this.dayOfWeek.push("Vendredi");
    this.dayOfWeek.push("Samedi");
    this.dayOfWeek.push("Dimanche");
    if (this.currentSchedule) {
      if (this.idDomoticItem == Domotic.thermostatId) {
        this.domoticTemperatudeService.getByScheduleID(this.currentSchedule.id).subscribe(value => {
          this.domoticTemperature = value[0];
          this.displayingTemperature = true;
          this.currentTemperatureMin = value[0].value;
        });
      }
      this.startDate = new Date(this.currentSchedule.start);
      this.endDate = new Date(this.currentSchedule.end);
      this.currentValueHours1 = this.startDate.getHours();
      this.currentValueMinute1 = this.startDate.getMinutes();
      this.currentValueMinute2 = this.endDate.getMinutes();
      this.currentValueHours2 = this.endDate.getHours();
      if (this.startDate.getUTCDay() == 1) this.dayUserChose = "Lundi";
      else if (this.startDate.getUTCDay() == 2) this.dayUserChose = "Mardi";
      else if (this.startDate.getUTCDay() == 3) this.dayUserChose = "Mercredi";
      else if (this.startDate.getUTCDay() == 4) this.dayUserChose = "Jeudi";
      else if (this.startDate.getUTCDay() == 5) this.dayUserChose = "Vendredi";
      else if (this.startDate.getUTCDay() == 6) this.dayUserChose = "Samedi";
      else if (this.startDate.getUTCDay() == 0) this.dayUserChose = "Dimanche";
    }
    if (!this.dayUserChose) {
      this.dayUserChose = "Lundi";
    }
  }

  keyPressedHours1(minValueHours: number, maxValueHours: number) {
    if (minValueHours > this.currentValueHours1) this.currentValueHours1 = minValueHours;
    else if (this.currentValueHours1 > maxValueHours) this.currentValueHours1 = maxValueHours;
  }

  keyPressedMinute1(minValueMinute: number, maxValueMinute: number) {
    if (minValueMinute > this.currentValueMinute1) this.currentValueMinute1 = minValueMinute;
    else if (this.currentValueMinute1 > maxValueMinute) this.currentValueMinute1 = maxValueMinute;
  }


  keyPressedHours2(minValueHours: number, maxValueHours: number) {
    if (minValueHours > this.currentValueHours2) this.currentValueHours2 = minValueHours;
    else if (this.currentValueHours2 > maxValueHours) this.currentValueHours2 = maxValueHours;
  }

  keyPressedMinute2(minValueMinute: number, maxValueMinute: number) {
    if (minValueMinute > this.currentValueMinute2) this.currentValueMinute2 = minValueMinute;
    else if (this.currentValueMinute2 > maxValueMinute) this.currentValueMinute2 = maxValueMinute;
  }

  onAddClick() {
    this.chooseDay();
    this.futureSchedule = new Schedules(undefined, this.startDate, this.endDate, this.idDomoticItem);
    this.scheduleService.add(this.futureSchedule).subscribe(value => {
      if (this.idDomoticItem == Domotic.thermostatId) {
        this.domoticTemperature = new DomoticTemperature(undefined, this.currentTemperatureMin, value["id"]);
        this.domoticTemperatudeService.add(this.domoticTemperature).subscribe(value1 => {
        });
      }
      this.updateList.emit(true);
      console.log("EMITTER SENT");
    });
  }

  onModifyClick() {
    this.chooseDay();
    this.futureSchedule = new Schedules(this.currentSchedule.id, this.startDate, this.endDate, this.idDomoticItem);
    this.scheduleService.put(this.futureSchedule).subscribe(value => {
      if (this.idDomoticItem == Domotic.thermostatId) {
        this.domoticTemperature = new DomoticTemperature(this.domoticTemperature.id, this.currentTemperatureMin, value["id"]);
        this.domoticTemperatudeService.put(this.domoticTemperature).subscribe(value1 => console.log("valueTempUpdated"));
      }
      console.log("modified");
      this.updateList.emit(true);
    });
  }

  chooseDay() {
    this.pipe = new DatePipe('en-US');
    if (this.dayUserChose === "Lundi") {
      this.startDate = new Date("06/11/2018, " + this.currentValueHours1.toString() + ":" + this.currentValueMinute1.toString());
      this.endDate = new Date("06/11/2018, " + this.currentValueHours2.toString() + ":" + this.currentValueMinute2.toString());
    }
    else if (this.dayUserChose === "Mardi") {
      this.startDate = new Date("06/12/2018, " + this.currentValueHours1.toString() + ":" + this.currentValueMinute1.toString());
      this.endDate = new Date("06/12/2018, " + this.currentValueHours2.toString() + ":" + this.currentValueMinute2.toString());
    }
    else if (this.dayUserChose === "Mercredi") {
      this.startDate = new Date("06/13/2018, " + this.currentValueHours1.toString() + ":" + this.currentValueMinute1.toString());
      this.endDate = new Date("06/13/2018, " + this.currentValueHours2.toString() + ":" + this.currentValueMinute2.toString());
    }
    else if (this.dayUserChose === "Jeudi") {
      this.startDate = new Date("06/14/2018, " + this.currentValueHours1.toString() + ":" + this.currentValueMinute1.toString());
      this.endDate = new Date("06/14/2018, " + this.currentValueHours2.toString() + ":" + this.currentValueMinute2.toString());
    }
    else if (this.dayUserChose === "Vendredi") {
      this.startDate = new Date("06/15/2018, " + this.currentValueHours1.toString() + ":" + this.currentValueMinute1.toString());
      this.endDate = new Date("06/15/2018, " + this.currentValueHours2.toString() + ":" + this.currentValueMinute2.toString());
    }
    else if (this.dayUserChose === "Samedi") {
      this.startDate = new Date("06/16/2018, " + this.currentValueHours1.toString() + ":" + this.currentValueMinute1.toString());
      this.endDate = new Date("06/16/2018, " + this.currentValueHours2.toString() + ":" + this.currentValueMinute2.toString());
    }
    else if (this.dayUserChose === "Dimanche") {
      this.startDate = new Date("06/17/2018, " + this.currentValueHours1.toString() + ":" + this.currentValueMinute1.toString());
      this.endDate = new Date("06/17/2018, " + this.currentValueHours2.toString() + ":" + this.currentValueMinute2.toString());
    }
  }
}
