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
  collapsedState: String = 'collapse';
  collapsedClass: String = 'navbar-collapse ' + this.collapsedState;

  constructor(private location: Location, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.suiviIncident = 'active';
    this.collapsedState = 'collapse';
    this.authenticationService.isLogged().subscribe(value => {
      if (!value) this.router.navigate(['connexion']);
    });
  }

  showNavBar() {
    //console.log('path : ' + this.location.path().endsWith('/connexion'));
    return !this.location.path().endsWith('/connexion');
  }

  logout() {

    this.authenticationService.logout();

  }

  expandOrCollapse() {
    this.collapsedState = (this.collapsedState === '') ? 'collapse' : '';
    this.collapsedClass = 'navbar-collapse ' + this.collapsedState;
  }
}
