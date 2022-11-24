import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";

const routes: Routes = [
  {
    path: 'Home', component: HomeComponent
  },
  {
    path: 'Login', component: LoginComponent
  },
  {
    path: 'Register', component: RegisterComponent
  },
  {
    path: '**', component: HomeComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class RoutesModule { }
