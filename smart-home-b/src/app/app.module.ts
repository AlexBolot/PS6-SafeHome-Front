import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeadComponent} from './component/head/head.component';
import {BodyComponent} from './component/body/body.component';
import {IssueListComponent} from './component/issue-list/issue-list.component';
import {IssueComponent} from './component/issue/issue.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    IssueListComponent,
    BodyComponent,
    HeadComponent,
    IssueComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
