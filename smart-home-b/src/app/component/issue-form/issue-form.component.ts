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
              private issueService: IssueService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initializeAllMap();
    });
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
    console.log(this.title);
    console.log(this.idCat);
    console.log(this.idUrgency);
    if (this.title && this.idCat && this.idUrgency) {
    //  console.log(this.issue = new Issue(8, this.title, this.description, this.dateIncident,
      //  this.dateDeclaration, this.idUrgency, this.idCat, this.idAuthor, this.idStatus, this.idLocation, this.picture));
      // this.issueService.add(this.issue);
      const dialogRef = this.dialog.open(PopupissueComponent, {});
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
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
