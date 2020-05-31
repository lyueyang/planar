import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NotetakingComponent } from './notetaking/notetaking.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'loginlanding'},
  { path: 'loginlanding', component: LoginComponent },
  { path: 'notetaking', component: NotetakingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
