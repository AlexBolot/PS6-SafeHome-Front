import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  suiviIncident = 'active';
  ajoutIncident = '';

  constructor(private location: Location, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.suiviIncident = 'active';
  }

  coverBtnDeconnexion() {
    return location.pathname !== '/connexion';
  }

  updateColorBtn(localisation: String) {
    this.suiviIncident = ' ';
    this.ajoutIncident = ' ';

    if (localisation === 'suiviIncident') {
      this.suiviIncident = 'active';
    }
    else if (localisation === 'ajoutIncident') {
      this.ajoutIncident = 'active';
    }
  }

  logout() {
    const response = this.authenticationService.logout();
    response.subscribe(() => this.router.navigate(['connexion']), () => this.router.navigate(['connexion']));
  }
}
