export class DomoticTemperature {
  id: number;
  value: number;
  scheduleId: number;

  constructor(id: number, value: number, scheduleId: number) {
    this.id = id;
    this.value = value;
    this.scheduleId = scheduleId;
  }

}
