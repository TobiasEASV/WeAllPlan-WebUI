import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {AuthguardService} from "../../services/authguard.service";
import {AnswerResolver, EncryptedAnswerResolver,DashboardResolver} from "../../services/resolvers.service";
import {AnswerComponent} from "../answer/answer.component";
import {CreateEventComponent} from "../create-event/create-event.component";
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
    path: 'Answer', component: AnswerComponent, title: 'Answer', canActivate:[AuthguardService], resolve: {Event: AnswerResolver}
  },
  {
    path: 'Answer/Share/:EncryptedEventId', component: AnswerComponent, title: 'Answer', resolve: {Event: EncryptedAnswerResolver}
  },
  {
    path: 'Dashboard', component: DashboardComponent, title: 'Dashboard', canActivate:[AuthguardService], resolve:{Event : DashboardResolver}
  },
  {
    path: 'CreateEvent', component: CreateEventComponent, canActivate:[AuthguardService], title: 'Create Event'
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
