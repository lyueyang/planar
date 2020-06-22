import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotetakingComponent } from './notetaking.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { EditingDialogComponent } from './editingDialog/editingDialog.component';

import {LoginComponent} from '../components/login/login.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [NotetakingComponent, SidebarComponent, EditingDialogComponent],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        AngularMaterialModule,
        FlexLayoutModule,
        MatDialogModule,
        MatMenuModule,
        MatTooltipModule
    ]
})
export class NotetakingModule {
}
