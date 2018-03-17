import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MatDialogModule, MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {AppComponent} from './app.component';
import {HeadComponent} from './component/head/head.component';
import {BodyComponent} from './component/body/body.component';
import {IssueFormComponent} from './component/issue-form/issue-form.component';
import {IssueListComponent} from './component/issue-list/issue-list.component';
import {IssueComponent} from './component/issue/issue.component';
import {AppRoutingModule} from './app-routing.module';
import {PopupissueComponent} from './popupissue/popupissue.component';
import {IssueService} from './service/issue/issue.service';
import {CategoryService} from './service/category/category.service';
import {UrgencyService} from './service/urgency/urgency.service';
import {StatusService} from './service/status/status.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    IssueListComponent,
    HeadComponent,
    IssueComponent,
    IssueFormComponent,
    PopupissueComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    PopupissueComponent
  ],
  providers: [IssueService, CategoryService, UrgencyService, StatusService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
