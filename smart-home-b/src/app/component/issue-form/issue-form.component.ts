import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges,
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

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit{
  public mapUrgency: Map<Number, String> = new Map<Number, String>();
  public mapCategory: Map<Number,String> = new Map<Number,String>();
  public mapLocation: Map<Number,String> = new Map<Number,String>();
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
  public issue : Issue;
  constructor(private route: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog,
              private urgencyService: UrgencyService,
              private categoryService: CategoryService,
              private issueService: IssueService) {
  }
  ngOnInit():void{
    setTimeout(() => {
      this.initializeAllMap();
    });
  }

  openDialogValidate(): void {
    this.dateDeclaration = new Date();
    this.issue = new Issue(8,this.title,this.description,this.dateIncident,
      this.dateDeclaration,this.idUrgency,this.idCat,this.idAuthor,this.idStatus,this.idLocation,this.picture);
    this.issueService.add(this.issue);
    const dialogRef = this.dialog.open(PopupissueComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogReturn(): void {
    const dialogRef = this.dialog.open(PopupreturnComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  initializeAllMap():void{
    this.urgencyService.getAll().subscribe(map => {
      this.mapUrgency = map;
      this.mapUrgencyKeys = map.keys();
    });
   /* this.categoryService.getAll().subscribe(map => {
      this.mapCategory = map;

    })*/
  }
}
