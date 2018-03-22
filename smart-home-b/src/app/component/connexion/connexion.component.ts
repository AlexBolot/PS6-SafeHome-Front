import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User} from '../../model/user';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  animations: [
    trigger('formFalseValidationId', [
      state('unchecked', style({})),
      state('invalid', style({})),
      transition('unchecked => invalid', animate(500, keyframes([
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(10%'}),
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(-10%'}),
      ])))
    ]),
    trigger('formFalseValidationPassword', [
      state('unchecked', style({})),
      state('invalid', style({})),
      transition('unchecked => invalid', animate(500, keyframes([
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(10%'}),
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(-10%'}),
      ])))
    ])]
})
export class ConnexionComponent implements OnInit {
  public user: User;
  erreurLogin = 'cover';
  formFalseValidationPassword = 'unchecked';
  formFalseValidationId = 'unchecked';
  animationRedId = false;
  animationRedPassword = false;
  constructor(private router: Router,
              private authentication: AuthenticationService) {
  }
  ngOnInit() {
    this.user = new User();
    this.erreurLogin = 'cover';
  }
  setBackToUnchecked(){
    this.formFalseValidationId = 'unchecked';
    this.formFalseValidationPassword = 'unchecked';
    this.animationRedId = false;
    this.animationRedPassword = false;
  }
  login() {
    this.authentication.login(this.user);
    if (this.user.email && this.user.password) {
      this.router.navigate(['/issueView']);
    } else {
      if (!this.user.email) {
        this.formFalseValidationId = 'invalid';
        this.animationRedId = true;
      }
      if (!this.user.password) {
        this.formFalseValidationPassword = 'invalid';
        this.animationRedPassword = true;
      }
      this.erreurLogin = 'display';
    }
  }
}
