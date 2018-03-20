import {Component, Inject} from '@angular/core';
import {PopupissueComponent} from '../popupissue/popupissue.component';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-popupreturn',
  templateUrl: './popupreturn.component.html',
  styleUrls: ['./popupreturn.component.css']
})
export class PopupreturnComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupreturnComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onOkClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/issueView']);
  }

}
