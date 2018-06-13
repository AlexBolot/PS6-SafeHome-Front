export class Schedules {
  id:number;
  start: Date;
  end: Date;
  domoticitemId:number;

  constructor(idSchedule:number,start:Date, end:Date,domoticitemId:number) {
    this.id = idSchedule;
    this.start=start;
    this.end = end;
    this.domoticitemId=domoticitemId;
  }
}
