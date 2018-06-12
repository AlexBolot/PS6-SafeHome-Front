import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {IssueFormComponent} from './component/issue-form/issue-form.component';
import {ConnexionComponent} from './component/connexion/connexion.component';
import {BodyComponent} from './component/body/body.component';
import {GuardCategoryResolve} from './service/guard/guardCategory.resolve';
import {GuardUrgencyResolve} from './service/guard/guardUrgency.resolve';
import {GuardLocationResolve} from './service/guard/guardLocation.resolve';
import {AuthGuard} from "./service/guard/auth-guard.service";
import {ConfigurationComponent} from "./component/configuration/configuration.component";

const routes: Routes = [
  {
    path: 'issueForm', component: IssueFormComponent, resolve: {
      dataCategory: GuardCategoryResolve,
      dataUrgency: GuardUrgencyResolve,
      dataLocation: GuardLocationResolve,
    }, canActivate: [AuthGuard],
  },
  {path: 'issueView', canActivate: [AuthGuard], component: BodyComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'config',component: ConfigurationComponent},
  {path: '', redirectTo: '/connexion', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
