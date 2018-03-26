import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User} from '../../model/user';
import {log} from 'util';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  ajouterIncident = 'not-selected';
  mesIncidents = 'not-selected';

  constructor(private location: Location, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    let user = new User();
    user.username = 'Numinex';
    user.email = 'bolotalex06@gmail.com';
    user.password = '@lexandr1';

//    this.authenticationService.createUser(user).subscribe(value => log("success"));
  }

  coverBtnDeconnexion() {
    return location.pathname !== '/connexion';
  }

  updateColorBtn() {
    this.mesIncidents = 'not-selected';
    this.ajouterIncident = 'not-selected';

    if (location.pathname === '/issueForm')
      this.ajouterIncident = 'selected';
    else if (location.pathname === '/issueView')
      this.mesIncidents = 'selected';

  }

  goTo() {

  }

}
