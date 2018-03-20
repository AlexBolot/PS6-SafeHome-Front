import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {PopupissueComponent} from '../popupissue/popupissue.component';
import {MatDialog} from '@angular/material';
import {PopupreturnComponent} from '../popupreturn/popupreturn.component';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog) { }

  ngOnInit() {
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
}
