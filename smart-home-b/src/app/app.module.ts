import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeadComponent} from './component/head/head.component';
import {BodyComponent} from './component/body/body.component';
import {IssueListComponent} from './component/issue-list/issue-list.component';
import {IssueComponent} from './component/issue/issue.component';
import {IssueService} from './service/issue/issue.service';
import {CategoryService} from './service/category/category.service';
import {UrgencyService} from './service/urgency/urgency.service';
import {StatusService} from './service/status/status.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    IssueListComponent,
    BodyComponent,
    HeadComponent,
    IssueComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [IssueService, CategoryService, UrgencyService, StatusService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
