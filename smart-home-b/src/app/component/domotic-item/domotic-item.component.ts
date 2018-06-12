import {Component, Input, OnInit} from '@angular/core';
import {Domotic} from "../../model/domotic";

@Component({
  selector: 'app-domotic-item',
  templateUrl: './domotic-item.component.html',
  styleUrls: ['./domotic-item.component.css']
})
export class DomoticItemComponent implements OnInit {
  @Input() domoticItem: Domotic;
  eye:String = "glyphicon glyphicon-eye-open";

  constructor() {
  }

  ngOnInit() {


  }

  onClickChangeEye() {
    if(this.eye== "glyphicon glyphicon-eye-open") this.eye = "glyphicon glyphicon-eye-close";
    else this.eye = "glyphicon glyphicon-eye-open"
  }
}
