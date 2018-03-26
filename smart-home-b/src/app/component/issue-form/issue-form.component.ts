import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PopupissueComponent} from '../popupissue/popupissue.component';
import {MatDialog} from '@angular/material';
import {PopupreturnComponent} from '../popupreturn/popupreturn.component';
import {Issue} from '../../model/issue';
import {UrgencyService} from '../../service/urgency/urgency.service';
import {getZoneAbbr} from 'ngx-bootstrap/chronos/units/timezone';
import {StatusService} from '../../service/status/status.service';
import {CategoryService} from '../../service/category/category.service';
import {IssueService} from '../../service/issue/issue.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {DATE} from 'ngx-bootstrap/chronos/units/constants';
import {log} from "util";

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css'],
  animations: [
    trigger('formFalseValidationTitle', [
      state('unchecked', style({})),
      state('invalid', style({})),
      transition('unchecked => invalid', animate(500, keyframes([
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(10%'}),
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(-10%'}),
      ])))
    ]),
    trigger('formFalseValidationUrgency', [
      state('unchecked', style({})),
      state('invalid', style({})),
      transition('unchecked => invalid', animate(500, keyframes([
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(10%'}),
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(-10%'}),
      ])))
    ]),
    trigger('formFalseValidationCat', [
      state('unchecked', style({})),
      state('invalid', style({})),
      transition('unchecked => invalid', animate(500, keyframes([
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(10%'}),
        style({transform: 'translateX(-10%'}),
        style({transform: 'translateX(-10%'}),
      ])))
    ])


  ]
})
export class IssueFormComponent implements OnInit {
  public mapUrgency: Map<Number, String> = new Map<Number, String>();
  public mapCategory: Map<Number, String> = new Map<Number, String>();
  public mapLocation: Map<Number, String> = new Map<Number, String>();
  public mapUrgencyKeys;
  public description: string;
  public title: string;
  public dateIncident: Date;
  public dateDeclaration: Date;
  public realDateIncident: Date;
  public idUrgency: number;
  public idCat: number;
  public idAuthor: number;
  public idStatus: number;
  public idLocation: number;
  public picture: string;
  public issue: Issue;
  public animationRedTitle: boolean;
  public animationRedUrgency: boolean;
  public animationRedCat: boolean;
  errorValidate = 'cover';
  formFalseValidationTitle = 'unchecked';
  formFalseValidationUrgency = 'unchecked';
  formFalseValidationCat = 'unchecked';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              public dialog: MatDialog,
              private urgencyService: UrgencyService,
              private categoryService: CategoryService,
              private authentificationService: AuthenticationService,
              private issueService: IssueService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initializeAllMap();
    });
    this.dateIncident = new Date();
  }

  setBackToUnchecked() {
    this.formFalseValidationTitle = 'unchecked';
    this.formFalseValidationUrgency = 'unchecked';
    this.formFalseValidationCat = 'unchecked';
    this.animationRedTitle = false;
    this.animationRedCat = false;
    this.animationRedUrgency = false;
  }

  openDialogReturn(): void {
    if (!this.idCat && !this.idUrgency && !this.description && !this.title && !this.idLocation) {
      this.router.navigate(['/issueView']);
    } else {
      const dialogRef = this.dialog.open(PopupreturnComponent, {});

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }

  initializeAllMap(): void {
    this.urgencyService.getAll().subscribe(map => {
      this.mapUrgency = map;
    });
    this.categoryService.getAll().subscribe(map => {
      this.mapCategory = map;
    });
  }

  openDialogValidate(): void {
    if (this.title && this.idCat && this.idUrgency) {
      this.dateDeclaration = new Date();
      this.realDateIncident = new Date(this.dateIncident);
      if (this.authentificationService.isLogged()) {
        this.idAuthor = this.authentificationService.getUser().idUser;
        this.idStatus = 1;
        this.issue = new Issue(undefined, this.title, this.description, this.realDateIncident,
          this.dateDeclaration, Number(this.idUrgency), Number(this.idCat), this.idAuthor, this.idStatus, undefined, undefined);
        this.issueService.add(this.issue).subscribe(value => log("added"));
        const dialogRef = this.dialog.open(PopupissueComponent, {});
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    } else {
      if (!this.title) {
        this.animationRedTitle = true;
        this.formFalseValidationTitle = 'invalid';
      }
      if (!this.idCat) {
        this.animationRedCat = true;
        this.formFalseValidationCat = 'invalid';
      }
      if (!this.idUrgency) {
        this.animationRedUrgency = true;
        this.formFalseValidationUrgency = 'invalid';
      }
      this.errorValidate = 'display';
    }
  }

}
