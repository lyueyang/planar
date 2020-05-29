import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotetakingComponent } from './notetaking.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import {AngularMaterialModule} from '../angular-material.module';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [NotetakingComponent, SidebarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class NotetakingModule { }
