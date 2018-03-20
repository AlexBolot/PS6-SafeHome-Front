import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(private location : Location) { }

  ngOnInit() {
  }
  coverBtnDeconnexion(){
    return location.pathname != "/connexion";
  }
  goTo() {

  }

}
