export class Domotic {
  id: number;
  name: string;

  static thermostatId = 1;
  static alarmId = 2;
  static bowlId = 3;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

}
