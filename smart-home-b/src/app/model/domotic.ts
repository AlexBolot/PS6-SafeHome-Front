export class Domotic {
  id: number;
  Name: string;

  static alarm = 0;
  static thermostat = 1;
  static light = 2;

  constructor(id: number, name: string) {
    this.id = id;
    this.Name = name;
  }

}
