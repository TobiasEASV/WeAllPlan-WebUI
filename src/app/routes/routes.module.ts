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
import {CreateEventComponent} from "../create-event/create-event.component";



const routes: Routes = [
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
    path: 'CreateEvent', component: CreateEventComponent, canActivate:[AuthguardService], title: 'Create Event'
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
