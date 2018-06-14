export class Domotic {

  static thermostatId = 1;
  static alarmId = 2;
  static bowlId = 3;

  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
