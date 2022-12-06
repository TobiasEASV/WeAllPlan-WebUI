import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Event} from "../types/event";

import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";



let Event: Event



@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  Dates: string[] = ['user']
  tempDates: string[] = ['user',' 28/1', '29/1', '2/2', '12/2', '12/2', '12/2', '12/2', '12/2', '12/2', '12/2', '12/2', '12/2', '12/2']
  AnswerDictionary: Map<string, number[]> =new Map();

  user = "";
  event: Event = Event
  InviteLink: string = "";
  response: number[] = [];

  constructor(public http: HttpService, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
      if(!this.http.IsUser){
        this.user = "John Do"
      }
        this.event = this.route.snapshot.data['Event'];
        this.user = this.http.user.UserName

    this.event.eventSlots.forEach((eventSlot)=> {
      this.Dates.push(eventSlot.startTime + " - " + eventSlot.endTime)
    })
    this.AnswerDictionary.set('Jan', [1,2,1,0,1,0,1,0,1,0,1,0,1])
    this.AnswerDictionary.set('mikkel', [1,2,1,0,2,1,0,2,1,0,2,1,0])
    console.log(this.event)
    this.response = new Array(this.tempDates.length-1).fill(0)
    }

  GenerateInviteLink(){
    this.http.GenerateInviteLink(this.http.SelectedEventId)
      .then(EncryptedInviteLink => this.InviteLink = environment.baseDomainUrl + "Answer/Share/" + EncryptedInviteLink )
  }

  changeResponse(response:number) {
    console.log(response)
    console.log(this.response[response])
    if (this.response[response] ==0)
    {
      this.response[response] =1;
    }
    else if (this.response[response] ==1)
    {
      this.response[response] =2;
    }
    else if (this.response[response] ==2)
    {
      this.response[response] =0;
    }
  }
}

