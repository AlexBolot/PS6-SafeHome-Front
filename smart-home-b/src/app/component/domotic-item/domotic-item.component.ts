import {Component, Input, OnInit} from '@angular/core';
import {DomoticItem} from "../../model/domotic";

@Component({
  selector: 'app-domotic-item',
  templateUrl: './domotic-item.component.html',
  styleUrls: ['./domotic-item.component.css']
})
export class DomoticItemComponent implements OnInit {
  @Input() domoticItem:DomoticItem;
  constructor() { }

  ngOnInit() {
  }

}
