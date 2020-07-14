import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import {FlexModule} from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    FlexModule,
    MatProgressSpinnerModule
  ]
})
export class LoadingPageModule { }
