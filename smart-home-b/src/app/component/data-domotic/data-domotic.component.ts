import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-data-domotic',
  templateUrl: './data-domotic.component.html',
  styleUrls: ['./data-domotic.component.css']
})
export class DataDomoticComponent implements OnInit {
  dayOfWeek: string[] = [];
  @Input() displayingTemperature;
  minValueHours = 0;
  maxValueHours = 23;
  minValueMinute = 0;
  maxValueMinute = 59;
  currentValueHours1 = 12;
  currentValueHours2 = 12;
  currentValueMinute1 = 30;
  currentValueMinute2 = 30;
  temperatureMin: 20;


  constructor() {
  }

  ngOnInit() {
    this.dayOfWeek.push("Lundi");
    this.dayOfWeek.push("Mardi");
    this.dayOfWeek.push("Mercredi");
    this.dayOfWeek.push("Jeudi");
    this.dayOfWeek.push("Vendredi");
    this.dayOfWeek.push("Samedi");
    this.dayOfWeek.push("Dimanche");
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

  }
}
