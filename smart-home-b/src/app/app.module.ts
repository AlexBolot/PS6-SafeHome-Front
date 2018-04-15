import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {AppComponent} from './app.component';
import {HeadComponent} from './component/head/head.component';
import {BodyComponent} from './component/body/body.component';
import {IssueFormComponent} from './component/issue-form/issue-form.component';
import {IssueListComponent} from './component/issue-list/issue-list.component';
import {IssueComponent} from './component/issue/issue.component';
import {AppRoutingModule} from './app-routing.module';
import {PopupissueComponent} from './component/popupissue/popupissue.component';
import {IssueService} from './service/issue/issue.service';
import {CategoryService} from './service/category/category.service';
import {UrgencyService} from './service/urgency/urgency.service';
import {StatusService} from './service/status/status.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConnexionComponent} from './component/connexion/connexion.component';
import {PopupreturnComponent} from './component/popupreturn/popupreturn.component';
import {FormsModule} from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TaskComponent} from './component/task/task.component';
import {TaskService} from './service/task/task.service';
import {AuthenticationService} from './service/authentication/authentication.service';
import {AuthInterceptor} from './service/authentication/auth-interceptor';
import {GuardCategoryResolve} from './service/guard/guardCategory.resolve';
import {GuardUrgencyResolve} from './service/guard/guardUrgency.resolve';
import {GuardLocationResolve} from './service/guard/guardLocation.resolve';
import {LocationService} from './service/location/location.service';
import {SpinnerComponent} from './component/spinner/spinner.component';
import {AuthGuard} from "./service/guard/auth-guard.service";


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    IssueListComponent,
    HeadComponent,
    IssueComponent,
    IssueFormComponent,
    PopupissueComponent,
    PopupreturnComponent,
    ConnexionComponent,
    TaskComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    InputTextareaModule,
  ],
  entryComponents: [
    PopupissueComponent,
    PopupreturnComponent
  ],
  providers: [
    IssueService,
    CategoryService,
    UrgencyService,
    StatusService,
    LocationService,
    HttpClient,
    TaskService,
    AuthenticationService,
    GuardCategoryResolve,
    GuardUrgencyResolve,
    GuardLocationResolve,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
