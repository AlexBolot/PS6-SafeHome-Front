import {AfterContentInit, Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit{
  public mapUrgency: Map<Number, String> = new Map<Number, String>();
  public mapCategory: Map<Number,String> = new Map<Number,String>();
  public mapLocation: Map<Number,String> = new Map<Number,String>();
  public description: String;
  public title: String;
  public dateIncident: Date;
  public dateDeclaration: Date;
  public idUrgency: number;
  public idCat: number;
  public idAuthor: number;
  public idStatus: number;
  public idLocation: number;

  constructor(private route: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog,
              private urgencyService: UrgencyService,
              private categoryService: CategoryService) {
  }
  ngOnInit(){
      setTimeout(() => {
        this.initializeAllMap();
      });
    }

  openDialogValidate(): void {
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
    });
    this.categoryService.getAll().subscribe(map => {
      this.mapCategory = map;
    })
  }
}
