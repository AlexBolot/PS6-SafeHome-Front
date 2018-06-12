import { Component, OnInit } from '@angular/core';
import {Domotic} from "../../model/domotic";
import {DomoticService} from "../../service/domotic/domotic.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  domoticItems:Domotic[] = [];

  constructor() { }

  ngOnInit() {
    this.domoticItems.push(new Domotic(0,"Thermostat"));
    this.domoticItems.push(new Domotic(1,"Alarme"));
    this.domoticItems.push(new Domotic(2,"Lumière"));
  }

}
