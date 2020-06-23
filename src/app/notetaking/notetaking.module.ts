import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotetakingComponent } from './notetaking.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { EditingDialogComponent } from './editingDialog/editingDialog.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [NotetakingComponent, EditingDialogComponent],
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
