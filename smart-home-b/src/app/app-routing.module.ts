import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { IssueFormComponent } from './component/issue-form/issue-form.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import {BodyComponent} from './component/body/body.component';

const routes: Routes = [
  { path: 'issueForm', component: IssueFormComponent },
  { path: 'issueView', component: BodyComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
