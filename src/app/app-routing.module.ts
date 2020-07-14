import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NotetakingComponent } from './notetaking/notetaking.component';
import { SpinnerComponent } from './loading-page/spinner/spinner.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'loginlanding'},
  { path: 'loginlanding', component: LoginComponent },
  { path: 'notetaking', component: NotetakingComponent},
  { path: 'loading', component: SpinnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
