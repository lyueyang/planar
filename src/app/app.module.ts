import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { LoginComponent } from './components/login/login.component';

import { NotetakingModule} from './notetaking/notetaking.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    ReactiveFormsModule,
    NotetakingModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
