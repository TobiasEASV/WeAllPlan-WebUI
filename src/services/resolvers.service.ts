import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {HttpService} from "./http.service";


@Injectable({providedIn: 'root'})
export class AnswerResolver implements Resolve<Event> {


  Event: Event | undefined
  EventId: string | null ='';

  constructor(private http: HttpService,  private route: ActivatedRoute) {
    this.EventId = this.route.snapshot.params['EventId'];
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.EventId = route.paramMap.get('EventId')
    let successResult =  await this.http.GetEventToAnswer(this.EventId);
    if(successResult == undefined){
      return false
    }else
    return successResult;
  }
}

@Injectable({providedIn: 'root'})
export class DashboardResolver implements Resolve<Event[]> {

  UserId: string = "";

  constructor(private http: HttpService) {

  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.UserId = this.http.user.Id;
    let successResult =  await this.http.GetEventsFromUserID(this.UserId);
    console.log(successResult)
    if(successResult == undefined){
      return false
    }else
      return successResult;
  }
}
