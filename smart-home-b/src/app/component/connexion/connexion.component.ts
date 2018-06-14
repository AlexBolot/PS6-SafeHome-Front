import {Component, IterableDiffers, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User} from '../../model/user';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {LocationService} from '../../service/location/location.service';
import {CategoryService} from '../../service/category/category.service';
import {UrgencyService} from '../../service/urgency/urgency.service';
import {StatusService} from '../../service/status/status.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  animations: [
    trigger('formFalseValidationId', [
      state('unchecked', style({})),
      state('invalid', style({})),
      transition('unchecked => invalid', animate(500, keyframes([
        style({transform: 'translateX(-1%'}),
        style({transform: 'translateX(1%'}),
        style({transform: 'translateX(-1%'}),
        style({transform: 'translateX(1%'}),
      ])))
    ]),
    trigger('formFalseValidationPassword', [
      state('unchecked', style({})),
      state('invalid', style({})),
      transition('unchecked => invalid', animate(500, keyframes([
        style({transform: 'translateX(-1%'}),
        style({transform: 'translateX(1%'}),
        style({transform: 'translateX(-1%'}),
        style({transform: 'translateX(1%'}),
      ])))
    ])]
})
export class ConnexionComponent implements OnInit {
  public user: User;
  erreurLogin = 'cover';
  invalidId = '';
  invalidPassWord = '';
  formFalseValidationPassword = 'unchecked';
  formFalseValidationId = 'unchecked';
  animationRedId = false;
  animationRedPassword = false;

  constructor(private router: Router,
              private authentication: AuthenticationService, private statusService: StatusService,
              private locationService: LocationService, private categoryService: CategoryService,
              private urgencyService: UrgencyService) {
  }

  ngOnInit() {
    this.refreshCache();
    this.user = new User();
    this.erreurLogin = 'cover';
    this.authentication.isLogged().subscribe(value => {
      if (value) {
        return this.router.navigate(['/issueView']);
      }
    });
  }

  refreshCache() {
    this.locationService.refreshCache();
    this.categoryService.refreshCache();
    this.statusService.refreshCache();
    this.urgencyService.refreshCache();
  }

  setBackToUnchecked() {
    this.formFalseValidationId = 'unchecked';
    this.formFalseValidationPassword = 'unchecked';
    this.animationRedId = false;
    this.animationRedPassword = false;
  }

  login() {
    if (this.user.email && this.user.password) {
      this.authentication.login(this.user);
    } else {
      if (!this.user.email) {
        this.formFalseValidationId = 'invalid';
        this.animationRedId = true;
        this.invalidId = 'error';
      } else {
        this.invalidId = '';
      }
      if (!this.user.password) {
        this.formFalseValidationPassword = 'invalid';
        this.animationRedPassword = true;
        this.invalidPassWord = 'error';
      } else {
        this.invalidPassWord = '';
      }

      this.erreurLogin = 'display';
    }
  }
}
