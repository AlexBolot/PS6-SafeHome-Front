import {Component, OnInit} from '@angular/core';
import {Domotic} from '../../model/domotic';
import {DomoticService} from '../../service/domotic/domotic.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  items: Domotic[] = [];
  selectedItem: Domotic = null;
  showTemperature = false;

  btnDefault = 'btn btn-block btn-lg btn-default';
  btnPrimary = 'btn btn-block btn-lg btn-primary';

  constructor(private domoticService: DomoticService) {
  }

  ngOnInit() {
    this.domoticService.getAll().subscribe(value => this.items = value);
  }

  onDomoticItemClick(domoticItem: Domotic) {
    this.showTemperature = domoticItem.id === Domotic.thermostatId;
    this.selectedItem = (this.selectedItem === domoticItem) ? null : domoticItem;
  }
}

