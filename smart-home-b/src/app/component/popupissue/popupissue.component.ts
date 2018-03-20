import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';

  @Component({
    selector: 'app-popupissue',
    templateUrl: './popupissue.component.html',
    styleUrls: ['./popupissue.component.css']
  })
  export class PopupissueComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupissueComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/issueView']);
  }
  onOkClick(): void {
    this.dialogRef.close();
    window.location.reload();
  }
}
