import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotetakingComponent } from './notetaking.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { EditingDialogComponent } from './editingDialog/editingDialog.component';
import { TelegramDialogComponent } from './telegram-dialog/telegram-dialog.component';


import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { AssignmentsComponent } from './assignments/assignments.component';
import { WordEditorComponent } from './word-editor/word-editor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    NotetakingComponent,
    EditingDialogComponent,
    AssignmentsComponent,
    WordEditorComponent,
    TelegramDialogComponent
  ],
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
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class NotetakingModule {
}
