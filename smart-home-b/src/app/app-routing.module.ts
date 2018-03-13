import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IssueFormComponent } from './component/issue-form/issue-form.component';
import {BodyComponent} from './component/body/body.component';

const routes: Routes = [
  { path: 'issueForm', component: IssueFormComponent },
  { path: 'issueView', component: BodyComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
