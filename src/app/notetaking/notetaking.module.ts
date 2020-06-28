import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotetakingComponent } from './notetaking.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { EditingDialogComponent } from './editingDialog/editingDialog.component';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { AssignmentsComponent } from './assignments/assignments.component';
import { WordEditorComponent } from './word-editor/word-editor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [NotetakingComponent, EditingDialogComponent, AssignmentsComponent, WordEditorComponent],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        AngularMaterialModule,
        FlexLayoutModule,
        MatDialogModule,
        MatMenuModule,
        MatTooltipModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class NotetakingModule {
}
