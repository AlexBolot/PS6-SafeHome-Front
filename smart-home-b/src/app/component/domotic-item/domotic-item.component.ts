import {Component, Input, OnInit} from '@angular/core';
import {Domotic} from "../../model/domotic";

@Component({
  selector: 'app-domotic-item',
  templateUrl: './domotic-item.component.html',
  styleUrls: ['./domotic-item.component.css']
})
export class DomoticItemComponent implements OnInit {
  @Input() domoticItem: Domotic;
  eye:String = "container-fluid panel panel-default";

  constructor() {
  }

  ngOnInit() {


  }

  onClickChangeEye() {
    if(this.eye== "container-fluid panel panel-default") this.eye = "container-fluid panel panel-primary";
    else this.eye = "container-fluid panel panel-default";
  }
}
