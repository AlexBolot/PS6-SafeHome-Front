import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {User} from '../../model/user';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  public user: User;
  erreurLogin = 'cover';
  constructor(private router : Router,
              private authentication : AuthenticationService) { }

  ngOnInit() {
    this.user = new User();
    this.erreurLogin = 'cover';
  }

  login(){
    this.authentication.login(this.user);
    if(this.user.email && this.user.password){
      this.router.navigate(["/issueView"]);
    } else{
      this.erreurLogin = 'display';
    }
  }
}
