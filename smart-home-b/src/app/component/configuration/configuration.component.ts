import { Component, OnInit } from '@angular/core';
import {DomoticItem} from "../../model/domotic";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  domoticItems:DomoticItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
