import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeadComponent} from './component/head/head.component';
import {BodyComponent} from './component/body/body.component';
import { IssueFormComponent } from './component/issue-form/issue-form.component';
import {IssueListComponent} from './component/issue-list/issue-list.component';
import {IssueComponent} from './component/issue/issue.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    IssueListComponent,
    HeadComponent,
    IssueComponent,
    IssueFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
