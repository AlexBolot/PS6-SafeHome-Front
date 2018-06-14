export class Schedule {
  id: number;
  start: Date;
  end: Date;
  domoticitemId: number;
  auto:boolean;

  constructor(idSchedule: number, start: Date, end: Date, domoticitemId: number,auto:boolean) {
    this.id = idSchedule;
    this.start = start;
    this.end = end;
    this.domoticitemId = domoticitemId;
    this.auto=auto;
  }
}
