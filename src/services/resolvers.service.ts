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
