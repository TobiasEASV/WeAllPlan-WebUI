import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {HttpService} from "./http.service";


/**
 * Resolver for getting an event based on an encrypted URL.
 */
@Injectable({providedIn: 'root'})
export class EncryptedAnswerResolver implements Resolve<Event> {

  Event: Event | undefined
  EventId: string | null ='';

  constructor(private http: HttpService,  private route: ActivatedRoute) {
    this.EventId = this.route.snapshot.params['EncryptedEventId'];
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.EventId = route.paramMap.get('EncryptedEventId')
    let successResult =  await this.http.GetEncryptedEventToAnswer(this.EventId);
    if(successResult == undefined){
      return false
    }else
      return successResult;
  }
}

/**
 * Resolver for getting an event based on an encrypted URL.
 */
@Injectable({providedIn: 'root'})
export class AnswerResolver implements Resolve<Event> {


  Event: Event | undefined

  constructor(private http: HttpService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    let successResult =  await this.http.GetEventToAnswer('1'); //this.http.SelectedEvent.id
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
