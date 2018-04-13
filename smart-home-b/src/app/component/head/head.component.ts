import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  suiviIncident = 'active';
  ajoutIncident = '';


  constructor(private location: Location, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.suiviIncident = 'active';
  }

  coverBtnDeconnexion() {
    return location.pathname !== '/connexion';
  }

  updateColorBtn(localisation : String) {
    this.suiviIncident =' ';
    this.ajoutIncident =' ';

    if (localisation === 'suiviIncident')
      this.suiviIncident = 'active';
    else if (localisation === 'ajoutIncident')
      this.ajoutIncident = 'active';
  }

  goTo() {

  }

}
