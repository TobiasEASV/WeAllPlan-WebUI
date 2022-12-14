import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CalendarDateFormatter, CalendarModule, DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {MatTreeModule} from "@angular/material/tree";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";

import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RoutesModule} from "./routes/routes.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatMenuModule} from "@angular/material/menu";
import {ClipboardModule} from "@angular/cdk/clipboard";
import { AnswerComponent } from './answer/answer.component';
import { CreateEventComponent } from './create-event/create-event.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ErrorPagesComponent } from './erorr-pages/error-pages.component';
import {MatTableModule} from "@angular/material/table";
import { GuestCredentialDialogComponent } from './answer/guest-credential-dialog/guest-credential-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    AnswerComponent,
    CreateEventComponent,
    ErrorPagesComponent,
    GuestCredentialDialogComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatTreeModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    RouterOutlet,
    MatIconModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatCheckboxModule,
    MatToolbarModule,
    RouterLink,
    MatMenuModule,
    ClipboardModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatAutocompleteModule
  ],
  providers: [MatSnackBar, Overlay, MatDialog,
    {provide: CalendarDateFormatter, useClass: CreateEventComponent}],
  bootstrap: [AppComponent],
})
export class AppModule { }

