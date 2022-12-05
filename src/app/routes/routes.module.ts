import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {AuthguardService} from "../../services/authguard.service";
import {AnswerResolver} from "../../services/resolvers.service";
import {AnswerComponent} from "../answer/answer.component";
import {ErrorPagesComponent} from "../erorr-pages/error-pages.component";



const routes: Routes = [
  {
    path: '', component: HomeComponent,  title: 'Home'
  },
  {
    path: 'Home', component: HomeComponent,  title: 'Home'
  },
  {
    path: 'Login', component: LoginComponent, title: 'Login'
  },
  {
    path: 'Register', component: RegisterComponent, title: 'Register'
  },
  {
    path: 'Answer/:EventId', component: AnswerComponent, title: 'Answer', canActivate:[AuthguardService]
  },
  {
    path: 'Answer/Share/:EventId', component: AnswerComponent, title: 'Answer', resolve: {Event: AnswerResolver}
  },
  {
    path: 'Dashboard', component: DashboardComponent, canActivate:[AuthguardService], title: 'Dashboard'
  },
  {
    path: '**',  component: ErrorPagesComponent, title: 'Error'
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
